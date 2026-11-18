<?php
/**
 * Faith Church logo. Uses the logo uploaded under Appearance → Customize → Site Identity when there is one
 * (on light backgrounds); otherwise the built-in vector version, which also has a light variant for dark areas.
 */
$light = ! empty( $args['light'] );
$label = get_bloginfo( 'name' ) . ', home';
?>
<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="wordmark<?php echo $light ? ' is-light' : ''; ?>" aria-label="<?php echo esc_attr( $label ); ?>">
	<?php
	$logo_id = (int) get_theme_mod( 'custom_logo' );
	if ( ! $light && $logo_id && wp_get_attachment_image_url( $logo_id, 'full' ) ) {
		echo wp_get_attachment_image( $logo_id, 'full', false, array( 'alt' => '', 'loading' => 'eager', 'decoding' => 'async' ) );
	} else {
		echo faith_logo_svg(); // phpcs:ignore WordPress.Security.EscapeOutput -- bundled theme file
	}
	?>
</a>
