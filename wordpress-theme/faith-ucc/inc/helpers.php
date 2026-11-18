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
	return array( 'visit', 'about', 'community', 'give', 'rent' );
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
 * {one|two|three} cycles through the words in place (the first one is what screen readers hear).
 * Each line rises in on load.
 */
function faith_headline( $text, $tag = 'h1', $class = 'display-xl' ) {
	$lines = array_filter( array_map( 'trim', preg_split( '/\r\n|\r|\n/', (string) $text ) ) );
	echo '<' . tag_escape( $tag ) . ' class="' . esc_attr( $class ) . '">';
	$i = 0;
	foreach ( $lines as $line ) {
		$html = preg_replace( '/\*(.+?)\*/', '<em class="accent">$1</em>', esc_html( $line ) );
		$html = preg_replace_callback( '/\{([^}]+)\}/', 'faith_rotator_html', $html );
		echo '<span class="line-mask"><span style="--i:' . (int) $i . '">' . $html . '</span></span>';
		$i++;
	}
	echo '</' . tag_escape( $tag ) . '>';
}

/** Markup for a {a|b|c} word rotator. Input is already escaped. */
function faith_rotator_html( $m ) {
	$words = array_values( array_filter( array_map( 'trim', explode( '|', $m[1] ) ), 'strlen' ) );
	if ( count( $words ) < 2 ) {
		return $words ? $words[0] : '';
	}
	$out = '<span class="screen-reader-text">' . $words[0] . '</span><span class="rotator" data-rotator aria-hidden="true">';
	foreach ( $words as $i => $w ) {
		$out .= '<span class="rot-word' . ( 0 === $i ? ' is-on' : '' ) . '">' . $w . '</span>';
	}
	return $out . '</span>';
}

/** YouTube video ID from any common link shape, or ''. */
function faith_youtube_id( $url ) {
	if ( preg_match( '~(?:youtu\.be/|youtube(?:-nocookie)?\.com/(?:watch\?(?:.*&)?v=|embed/|shorts/|live/|v/))([A-Za-z0-9_-]{11})~', (string) $url, $m ) ) {
		return $m[1];
	}
	return '';
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
		'search'      => '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.4-4.4"/>',
		'pin'         => '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.3"/>',
		'play'        => '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
		'mail'        => '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="m4 7 8 6 8-6"/>',
	);
	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}
	return '<svg class="icon icon-' . esc_attr( $name ) . '" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' . $paths[ $name ] . '</svg>';
}

/** Social network icons (filled, 24px grid). */
function faith_social_icon( $name ) {
	$paths = array(
		'facebook'  => '<path d="M13.6 21v-7.4h2.5l.4-3h-2.9V8.8c0-.9.3-1.4 1.5-1.4h1.5V4.7a20 20 0 0 0-2.2-.1c-2.2 0-3.7 1.3-3.7 3.8v2.2H8.2v3h2.5V21z"/>',
		'instagram' => '<path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 3c-2.4 0-2.7 0-3.7.1-1 0-1.7.2-2.2.4a4.5 4.5 0 0 0-2.6 2.6c-.2.5-.4 1.2-.4 2.2C3 9.3 3 9.6 3 12s0 2.7.1 3.7c0 1 .2 1.7.4 2.2a4.5 4.5 0 0 0 2.6 2.6c.5.2 1.2.4 2.2.4 1 .1 1.3.1 3.7.1s2.7 0 3.7-.1c1 0 1.7-.2 2.2-.4a4.5 4.5 0 0 0 2.6-2.6c.2-.5.4-1.2.4-2.2.1-1 .1-1.3.1-3.7s0-2.7-.1-3.7c0-1-.2-1.7-.4-2.2a4.5 4.5 0 0 0-2.6-2.6c-.5-.2-1.2-.4-2.2-.4C14.7 3 14.4 3 12 3zm0 1.6c2.4 0 2.6 0 3.6.1.9 0 1.4.2 1.7.3.4.2.7.4 1 .7.3.3.5.6.7 1 .1.3.3.8.3 1.7.1 1 .1 1.2.1 3.6s0 2.6-.1 3.6c0 .9-.2 1.4-.3 1.7-.2.4-.4.7-.7 1-.3.3-.6.5-1 .7-.3.1-.8.3-1.7.3-1 .1-1.2.1-3.6.1s-2.6 0-3.6-.1c-.9 0-1.4-.2-1.7-.3-.4-.2-.7-.4-1-.7-.3-.3-.5-.6-.7-1-.1-.3-.3-.8-.3-1.7-.1-1-.1-1.2-.1-3.6s0-2.6.1-3.6c0-.9.2-1.4.3-1.7.2-.4.4-.7.7-1 .3-.3.6-.5 1-.7.3-.1.8-.3 1.7-.3 1-.1 1.2-.1 3.6-.1z"/>',
		'youtube'   => '<path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3z"/>',
		'tiktok'    => '<path d="M16.6 3h-3.1v12.1a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.4a5.8 5.8 0 1 0 4.9 5.7V9a7.5 7.5 0 0 0 4.4 1.4V7.3A4.4 4.4 0 0 1 16.6 3z"/>',
		'x'         => '<path d="M17.8 3h3.1l-6.8 7.7 8 10.3h-6.2l-4.9-6.3L5.4 21H2.3l7.2-8.3L1.8 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z"/>',
	);
	if ( ! isset( $paths[ $name ] ) ) {
		return '';
	}
	return '<svg class="icon icon-social" viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">' . $paths[ $name ] . '</svg>';
}

/** The church's social links that are filled in, as [ network, label, url ]. */
function faith_social_links() {
	$o   = faith_opts();
	$out = array();
	foreach ( array( 'facebook' => 'Facebook', 'instagram' => 'Instagram', 'youtube' => 'YouTube', 'tiktok' => 'TikTok', 'x' => 'X' ) as $net => $label ) {
		$key = 'x' === $net ? 'twitter_url' : $net . '_url';
		if ( ! empty( $o[ $key ] ) ) {
			$out[] = array( $net, $label, $o[ $key ] );
		}
	}
	return $out;
}

/** The swagged rainbow ribbons, after the ones strung across the sanctuary rafters. */
function faith_ribbons( $class = '', $sag = 0.6, $stroke = 3 ) {
	$colors = array( '#F07474', '#F7A660', '#FBDE45', '#4AB67C', '#5C74B7', '#B585BA' ); // UCC Love Is Louder rainbow
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

/**
 * The church's official logo as inline SVG (vector traced from the official logo file).
 * $full = true adds the "NEW BRAUNFELS, TEXAS" line.
 */
function faith_logo_svg( $full = false ) {
	static $svg = array();
	$file = $full ? 'faith-logo-full.svg' : 'faith-logo.svg';
	if ( ! isset( $svg[ $file ] ) ) {
		$svg[ $file ] = (string) file_get_contents( FAITH_DIR . '/assets/img/' . $file ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	}
	return $svg[ $file ];
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
