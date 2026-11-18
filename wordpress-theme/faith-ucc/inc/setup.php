<?php
/**
 * Theme supports, assets, and front-end tweaks.
 */

add_action( 'after_setup_theme', function () {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'html5', array( 'search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'custom-logo', array( 'height' => 200, 'width' => 260, 'flex-height' => true, 'flex-width' => true ) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'editor-styles' );
	add_editor_style( array( 'assets/fonts/fonts.css', 'assets/css/editor.css' ) );
	add_image_size( 'faith-card', 900, 675, true );
	add_image_size( 'faith-wide', 1600, 900, false );
	register_nav_menus( array( 'footer' => __( 'Footer links', 'faith-ucc' ) ) );
} );

add_action( 'wp_enqueue_scripts', function () {
	// Fonts are bundled with the theme (no Google Fonts requests).
	wp_enqueue_style( 'faith-fonts', FAITH_URI . '/assets/fonts/fonts.css', array(), FAITH_VERSION );
	wp_enqueue_style( 'faith-theme', FAITH_URI . '/assets/css/theme.css', array( 'faith-fonts' ), FAITH_VERSION );
	wp_enqueue_script( 'faith-theme', FAITH_URI . '/assets/js/theme.js', array(), FAITH_VERSION, array( 'strategy' => 'defer', 'in_footer' => true ) );
	wp_localize_script( 'faith-theme', 'FAITH', faith_js_config() );

	// The designed pages don't use block styles; posts and plain pages keep them.
	if ( is_front_page() || faith_is_designed_page() ) {
		wp_dequeue_style( 'wp-block-library' );
		wp_dequeue_style( 'global-styles' );
		wp_dequeue_style( 'classic-theme-styles' );
	}
}, 20 );

add_action( 'wp_head', function () {
	echo '<meta name="theme-color" content="#FFFFFF">' . "\n";
	echo '<link rel="preload" href="' . esc_url( FAITH_URI . '/assets/fonts/Fraunces-normal-300_700-latin.woff2' ) . '" as="font" type="font/woff2" crossorigin>' . "\n";
	echo '<link rel="preload" href="' . esc_url( FAITH_URI . '/assets/fonts/InstrumentSans-normal-400_600-latin.woff2' ) . '" as="font" type="font/woff2" crossorigin>' . "\n";
	if ( ! has_site_icon() ) {
		echo '<link rel="icon" type="image/png" href="' . esc_url( FAITH_URI . '/assets/img/favicon.png' ) . '">' . "\n";
		echo '<link rel="apple-touch-icon" href="' . esc_url( FAITH_URI . '/assets/img/apple-touch-icon.png' ) . '">' . "\n";
	}
	if ( is_front_page() ) {
		echo '<link rel="preload" as="image" href="' . esc_url( faith_img( 'choir.webp' ) ) . '">' . "\n";
		echo '<meta name="description" content="' . esc_attr( faith_opt( 'meta_description' ) ) . '">' . "\n";
		echo '<meta property="og:image" content="' . esc_url( faith_img( 'choir.webp' ) ) . '">' . "\n";
		faith_print_schema();
	}
}, 1 );

/** Body classes for page-specific styling. */
add_filter( 'body_class', function ( $classes ) {
	$classes[] = 'faith';
	return $classes;
} );

/** Shorter, cleaner excerpts. */
add_filter( 'excerpt_length', fn() => 28 );
add_filter( 'excerpt_more', fn() => '…' );

/** Events archive: upcoming only, soonest first. */
add_action( 'pre_get_posts', function ( WP_Query $q ) {
	if ( is_admin() || ! $q->is_main_query() ) {
		return;
	}
	if ( $q->is_post_type_archive( 'faith_event' ) ) {
		$q->set( 'meta_key', 'faith_date' );
		$q->set( 'orderby', 'meta_value' );
		$q->set( 'order', 'ASC' );
		$q->set( 'posts_per_page', 50 );
		$q->set( 'meta_query', array( array( 'key' => 'faith_date', 'value' => faith_today(), 'compare' => '>=', 'type' => 'DATE' ) ) );
	}
} );

function faith_print_schema() {
	$o      = faith_opts();
	$schema = array(
		'@context'     => 'https://schema.org',
		'@type'        => 'Church',
		'name'         => get_bloginfo( 'name' ),
		'url'          => home_url( '/' ),
		'telephone'    => $o['phone'],
		'email'        => $o['email'],
		'address'      => array(
			'@type'           => 'PostalAddress',
			'streetAddress'   => $o['street'],
			'addressLocality' => $o['city'],
			'addressRegion'   => $o['state'],
			'postalCode'      => $o['zip'],
			'addressCountry'  => 'US',
		),
		'foundingDate' => '1966-09-04',
		'sameAs'       => array_values( array_filter( array( $o['facebook_url'], $o['twitter_url'] ) ) ),
	);
	echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES ) . '</script>' . "\n";
}
