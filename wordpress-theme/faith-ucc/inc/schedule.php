<?php
/**
 * Dates: recurring gatherings, one-off events, and the merged "coming up" list.
 * Pages may be cached, so every list also carries data attributes that theme.js
 * uses to recompute dates and drop past items in the visitor's browser.
 */

function faith_now() {
	return new DateTimeImmutable( 'now', wp_timezone() );
}

/** Does $date match the rule? $rule is 'weekly', '1'..'4', or 'last'. */
function faith_date_matches( DateTimeImmutable $date, $rule, $weekday ) {
	if ( (int) $date->format( 'w' ) !== (int) $weekday ) {
		return false;
	}
	if ( 'weekly' === $rule ) {
		return true;
	}
	$day = (int) $date->format( 'j' );
	if ( 'last' === $rule ) {
		return $date->modify( '+7 days' )->format( 'n' ) !== $date->format( 'n' );
	}
	return (int) ceil( $day / 7 ) === (int) $rule;
}

/** Next date (today included) matching the rule, as Y-m-d. */
function faith_next_occurrence( $rule, $weekday, $from = null ) {
	$d = ( $from ? $from : faith_now() )->setTime( 12, 0 );
	for ( $i = 0; $i < 62; $i++ ) {
		if ( faith_date_matches( $d, $rule, $weekday ) ) {
			return $d->format( 'Y-m-d' );
		}
		$d = $d->modify( '+1 day' );
	}
	return $d->format( 'Y-m-d' );
}

function faith_rule_label( $rule, $weekday ) {
	$days    = array( 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' );
	$plural  = $days[ (int) $weekday ] . 's';
	$ordinal = array(
		'1'    => 'First',
		'2'    => 'Second',
		'3'    => 'Third',
		'4'    => 'Fourth',
		'last' => 'Last',
	);
	if ( 'weekly' === $rule ) {
		return 'Every ' . $days[ (int) $weekday ];
	}
	return ( $ordinal[ $rule ] ?? '' ) . ' ' . $plural;
}

/** JS-friendly rule token: "weekly:0", "nth:0:3", "last:6". */
function faith_rule_token( $rule, $weekday ) {
	if ( 'weekly' === $rule ) {
		return 'weekly:' . (int) $weekday;
	}
	if ( 'last' === $rule ) {
		return 'last:' . (int) $weekday;
	}
	return 'nth:' . (int) $weekday . ':' . (int) $rule;
}

/** Normalized data for one regular gathering. */
function faith_gathering_data( $post ) {
	$rule    = get_post_meta( $post->ID, 'faith_rule', true );
	$rule    = $rule ? $rule : 'weekly';
	$weekday = get_post_meta( $post->ID, 'faith_weekday', true );
	$weekday = '' === $weekday ? 0 : (int) $weekday;
	$start   = get_post_meta( $post->ID, 'faith_start', true );
	$end     = get_post_meta( $post->ID, 'faith_end', true );
	return array(
		'id'     => $post->ID,
		'title'  => get_the_title( $post ),
		'rule'   => $rule,
		'weekly' => 'weekly' === $rule,
		'token'  => faith_rule_token( $rule, $weekday ),
		'when'   => faith_rule_label( $rule, $weekday ),
		'time'   => faith_time_range( $start, $end ),
		'blurb'  => get_post_meta( $post->ID, 'faith_blurb', true ),
		'date'   => faith_next_occurrence( $rule, $weekday ),
		'image'  => (string) get_the_post_thumbnail_url( $post, 'medium_large' ),
		'alt'    => faith_thumb_alt( $post ),
		'wide'   => faith_thumb_is_wide( $post ),
	);
}

function faith_get_gatherings() {
	$posts = get_posts(
		array(
			'post_type'      => 'faith_gathering',
			'posts_per_page' => 50,
			'orderby'        => array( 'menu_order' => 'ASC', 'title' => 'ASC' ),
			'no_found_rows'  => true,
		)
	);
	return array_map( 'faith_gathering_data', $posts );
}

/** True when a post's featured image is landscape (a wide flyer gets a double-width card). */
function faith_thumb_is_wide( $post ) {
	$src = wp_get_attachment_image_src( get_post_thumbnail_id( $post ), 'medium_large' );
	return $src && $src[2] && ( $src[1] / $src[2] ) > 1.15;
}

/** Alt text of a post's featured image, falling back to the post title. */
function faith_thumb_alt( $post ) {
	$id  = get_post_thumbnail_id( $post );
	$alt = $id ? get_post_meta( $id, '_wp_attachment_image_alt', true ) : '';
	return $alt ? $alt : get_the_title( $post );
}

/** Normalized data for one event. */
function faith_event_data( $post ) {
	$date = get_post_meta( $post->ID, 'faith_date', true );
	return array(
		'id'       => $post->ID,
		'title'    => get_the_title( $post ),
		'date'     => $date,
		'time'     => faith_time_range( get_post_meta( $post->ID, 'faith_start', true ), get_post_meta( $post->ID, 'faith_end', true ) ),
		'location' => get_post_meta( $post->ID, 'faith_location', true ),
		'link'     => get_post_meta( $post->ID, 'faith_link', true ),
		'url'      => get_permalink( $post ),
		'image'    => (string) get_the_post_thumbnail_url( $post, 'medium_large' ),
		'alt'      => faith_thumb_alt( $post ),
		'wide'     => faith_thumb_is_wide( $post ),
		'blurb'    => wp_trim_words( wp_strip_all_tags( str_replace( array( '</p>', '<br>', '<br />' ), ' ', $post->post_content ) ), 26 ),
	);
}

/** Upcoming one-off events, soonest first. */
function faith_upcoming_events( $limit = 20 ) {
	$posts = get_posts(
		array(
			'post_type'      => 'faith_event',
			'posts_per_page' => $limit,
			'meta_key'       => 'faith_date',
			'orderby'        => 'meta_value',
			'order'          => 'ASC',
			'no_found_rows'  => true,
			'meta_query'     => array(
				array(
					'key'     => 'faith_date',
					'value'   => faith_today(),
					'compare' => '>=',
					'type'    => 'DATE',
				),
			),
		)
	);
	return array_map( 'faith_event_data', $posts );
}

/**
 * Merged list for "Coming up": one-off events plus the monthly gatherings.
 * Weekly gatherings are left out (they'd crowd everything else).
 */
function faith_coming_up( $limit = 5 ) {
	$items = array();
	foreach ( faith_upcoming_events( 12 ) as $e ) {
		$items[] = array(
			'title' => $e['title'],
			'date'  => $e['date'],
			'time'  => $e['time'],
			'blurb' => $e['location'] ? $e['location'] . ( $e['blurb'] ? ' · ' . $e['blurb'] : '' ) : $e['blurb'],
			'url'   => $e['url'],
			'token' => '',
			'image' => $e['image'],
			'alt'   => $e['alt'],
			'wide'  => $e['wide'],
		);
	}
	foreach ( faith_get_gatherings() as $g ) {
		if ( $g['weekly'] ) {
			continue;
		}
		$items[] = array(
			'title' => $g['title'],
			'date'  => $g['date'],
			'time'  => $g['time'],
			'blurb' => $g['blurb'],
			'url'   => '',
			'token' => $g['token'],
			'image' => $g['image'],
			'alt'   => $g['alt'],
			'wide'  => $g['wide'],
		);
	}
	usort( $items, fn( $a, $b ) => strcmp( $a['date'], $b['date'] ) );
	return $items;
}

function faith_is_first_sunday( $ymd ) {
	$d = DateTimeImmutable::createFromFormat( 'Y-m-d H:i', $ymd . ' 12:00', wp_timezone() );
	return $d && faith_date_matches( $d, '1', 0 );
}

function faith_fmt_date( $ymd, $format ) {
	$d = DateTimeImmutable::createFromFormat( 'Y-m-d H:i', $ymd . ' 12:00', wp_timezone() );
	return $d ? wp_date( $format, $d->getTimestamp() ) : '';
}

/** Data attributes theme.js reads to keep cached lists current. */
function faith_date_attrs( $date, $token = '' ) {
	return ' data-date="' . esc_attr( $date ) . '"' . ( $token ? ' data-rule="' . esc_attr( $token ) . '"' : '' );
}
