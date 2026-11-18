<?php
/**
 * Small helpers used across templates.
 */

/** URL of a bundled theme image. */
function faith_img( $file ) {
	return FAITH_URI . '/assets/img/' . $file;
}

/** Today's date (Y-m-d) in the site's timezone. */
function faith_today() {
	return wp_date( 'Y-m-d' );
}

/** Slugs of pages that use a designed template. */
function faith_designed_slugs() {
	return array( 'visit', 'about', 'community', 'give' );
}

function faith_is_designed_page() {
	if ( ! is_page() ) {
		return false;
	}
	$post = get_queried_object();
	return $post instanceof WP_Post && in_array( $post->post_name, faith_designed_slugs(), true );
}

/** Permalink of a seeded page by slug, with optional #section. Falls back to home. */
function faith_page_url( $slug, $section = '' ) {
	if ( 'home' === $slug ) {
		$url = home_url( '/' );
	} elseif ( 'news' === $slug ) {
		$posts_page = (int) get_option( 'page_for_posts' );
		$url        = $posts_page ? get_permalink( $posts_page ) : home_url( '/' );
	} else {
		$page = get_page_by_path( $slug );
		$url  = $page ? get_permalink( $page ) : home_url( '/' . $slug . '/' );
	}
	return $section ? $url . '#' . $section : $url;
}

/** Which top-level section is current, for nav highlighting. */
function faith_current_section() {
	if ( is_front_page() ) {
		return 'home';
	}
	if ( is_home() || is_singular( 'post' ) || is_category() || is_tag() || is_date() || is_author() ) {
		return 'news';
	}
	if ( is_post_type_archive( 'faith_event' ) || is_singular( 'faith_event' ) ) {
		return 'community';
	}
	if ( is_page() ) {
		$post = get_queried_object();
		if ( $post instanceof WP_Post ) {
			return $post->post_name;
		}
	}
	return '';
}

/**
 * Render a big headline. One line per row; wrap words in *asterisks* for the italic accent.
 * Each line rises in on load.
 */
function faith_headline( $text, $tag = 'h1', $class = 'display-xl' ) {
	$lines = array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) $text ) ) );
	echo '<' . tag_escape( $tag ) . ' class="' . esc_attr( $class ) . '">';
	$i = 0;
	foreach ( $lines as $line ) {
		$html = preg_replace( '/\*(.+?)\*/', '<em class="accent">$1</em>', esc_html( $line ) );
		echo '<span class="line-mask"><span style="--i:' . (int) $i . '">' . $html . '</span></span>';
		$i++;
	}
	echo '</' . tag_escape( $tag ) . '>';
}

/** Page headline meta, falling back to the title. */
function faith_page_headline( $post = null ) {
	$post = get_post( $post );
	$h    = $post ? get_post_meta( $post->ID, 'faith_headline', true ) : '';
	return $h ? $h : get_the_title( $post );
}

/** A photo figure. */
function faith_figure( $src, $alt, $args = array() ) {
	$args = wp_parse_args(
		$args,
		array(
			'ratio'   => '4-3',
			'caption' => '',
			'class'   => '',
			'eager'   => false,
			'reveal'  => true,
			'i'       => 0,
		)
	);
	printf(
		'<figure class="figure %1$s%2$s" style="--i:%3$d"><div class="photo ratio-%4$s"><img src="%5$s" alt="%6$s" loading="%7$s" decoding="async"%8$s></div>%9$s</figure>',
		esc_attr( $args['class'] ),
		$args['reveal'] ? ' reveal' : '',
		(int) $args['i'],
		esc_attr( $args['ratio'] ),
		esc_url( $src ),
		esc_attr( $alt ),
		$args['eager'] ? 'eager' : 'lazy',
		$args['eager'] ? ' fetchpriority="high"' : '',
		$args['caption'] ? '<figcaption>' . esc_html( $args['caption'] ) . '</figcaption>' : ''
	);
}

/** Inline SVG icons (no icon font, no extra requests). */
function faith_icon( $name ) {
	$paths = array(
		'arrow'       => '<path d="M5 12h14M13 6l6 6-6 6"/>',
		'arrow-left'  => '<path d="M19 12H5M11 6l-6 6 6 6"/>',
		'arrow-up-right' => '<path d="M7 17 17 7M8 7h9v9"/>',
		'plus'        => '<path d="M12 5v14M5 12h14"/>',
		'close'       => '<path d="M6 6l12 12M18 6 6 18"/>',
	);
	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}
	return '<svg class="icon icon-' . esc_attr( $name ) . '" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $paths[ $name ] . '</svg>';
}

/** The swagged rainbow ribbons, after the ones strung across the sanctuary rafters. */
function faith_ribbons( $class = '', $sag = 0.6, $stroke = 3 ) {
	$colors = array( '#E22726', '#F26B2A', '#FFDE16', '#0B9444', '#0F75BC', '#863695' ); // UCC rainbow
	$w      = 1200;
	$out    = '<svg class="ribbons ' . esc_attr( $class ) . '" viewBox="0 0 ' . $w . ' 220" preserveAspectRatio="none" aria-hidden="true" focusable="false">';
	foreach ( $colors as $i => $c ) {
		$y0  = 18 + $i * 14;
		$y1  = 40 + $i * 9;
		$dip = 60 + $sag * 110 - $i * 6;
		$d   = sprintf(
			'M -20 %1$s C %2$s %3$s, %4$s %5$s, %6$s %7$s',
			$y0,
			$w * 0.28,
			$y0 + $dip,
			$w * 0.62,
			$y1 + $dip * 0.9,
			$w + 20,
			$y1
		);
		$out .= '<g class="ribbon-sway" style="--i:' . $i . '"><path class="ribbon-path" d="' . esc_attr( $d ) . '" pathLength="1" stroke="' . $c . '" stroke-width="' . (float) $stroke . '" vector-effect="non-scaling-stroke" style="--i:' . $i . '"/></g>';
	}
	return $out . '</svg>';
}

/** The church's logo as inline SVG (bundled; traced from the church's own logo). */
function faith_logo_svg() {
	static $svg = null;
	if ( null === $svg ) {
		$svg = (string) file_get_contents( FAITH_DIR . '/assets/img/faith-logo.svg' ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	}
	return $svg;
}

/** Turn plain text with blank lines into paragraphs (for settings textareas). */
function faith_paragraphs( $text ) {
	return wpautop( esc_html( (string) $text ) );
}

/** Config handed to theme.js. */
function faith_js_config() {
	$o = faith_opts();
	return array(
		'tz'             => wp_timezone_string(),
		'worshipStart'   => faith_time_to_minutes( $o['worship_start'] ),
		'worshipEnd'     => faith_time_to_minutes( $o['worship_end'] ),
		'worshipLabel'   => faith_time_label( $o['worship_start'] ),
		'zoomUrl'        => $o['zoom_url'],
		'showCommunion'  => ! empty( $o['communion_first_sunday'] ),
	);
}

/** "10:00" -> 600 */
function faith_time_to_minutes( $t ) {
	if ( ! preg_match( '/^(\d{1,2}):(\d{2})/', (string) $t, $m ) ) {
		return 0;
	}
	return (int) $m[1] * 60 + (int) $m[2];
}

/** "10:00" -> "10 a.m."; "18:30" -> "6:30 p.m." */
function faith_time_label( $t ) {
	if ( ! preg_match( '/^(\d{1,2}):(\d{2})/', (string) $t, $m ) ) {
		return '';
	}
	$h    = (int) $m[1];
	$min  = (int) $m[2];
	$ampm = $h >= 12 ? 'p.m.' : 'a.m.';
	$h12  = $h % 12 ? $h % 12 : 12;
	if ( 12 === $h && 0 === $min ) {
		return 'noon';
	}
	return $h12 . ( $min ? ':' . str_pad( (string) $min, 2, '0', STR_PAD_LEFT ) : '' ) . ' ' . $ampm;
}

/** "10:00", "11:20" -> "10:00–11:20 a.m." */
function faith_time_range( $start, $end ) {
	if ( ! $start ) {
		return '';
	}
	if ( ! $end ) {
		return faith_time_label( $start );
	}
	$s = faith_time_label( $start );
	$e = faith_time_label( $end );
	$sp = substr( $s, -4 );
	$ep = substr( $e, -4 );
	if ( $sp === $ep && 'noon' !== $s && 'noon' !== $e ) {
		$s = trim( substr( $s, 0, -4 ) );
		if ( false === strpos( $s, ':' ) ) {
			$s .= ':00';
		}
		if ( false === strpos( $e, ':' ) ) {
			$e = str_replace( ' ', ':00 ', $e );
		}
	}
	return $s . '–' . $e;
}

/** Card image for a post: featured image, else the first image in the post body. */
function faith_post_image( $post ) {
	$url = get_the_post_thumbnail_url( $post, 'faith-card' );
	if ( $url ) {
		return $url;
	}
	if ( preg_match( '/<img[^>]+src=["\']([^"\']+)["\']/i', (string) $post->post_content, $m ) ) {
		return $m[1];
	}
	return '';
}

/** First real category (skips "Uncategorized" and the old month-name categories). */
function faith_post_category( $post ) {
	foreach ( get_the_category( $post->ID ) as $c ) {
		if ( 'uncategorized' === $c->slug || preg_match( '/^[A-Z][a-z]+ \d{4}$/', $c->name ) ) {
			continue;
		}
		return $c;
	}
	return null;
}
