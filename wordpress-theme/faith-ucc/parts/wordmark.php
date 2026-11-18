<?php
/**
 * Faith Church logo (built-in vector, traced from the church's own logo).
 * $args['light'] = light colors for dark backgrounds; $args['mono'] = one-color white, for the blue header.
 */
$variant = ! empty( $args['mono'] ) ? ' is-mono' : ( ! empty( $args['light'] ) ? ' is-light' : '' );
?>
<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="wordmark<?php echo esc_attr( $variant ); ?>" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) . ', home' ); ?>">
	<?php echo faith_logo_svg(); // phpcs:ignore WordPress.Security.EscapeOutput -- bundled theme file ?>
</a>
