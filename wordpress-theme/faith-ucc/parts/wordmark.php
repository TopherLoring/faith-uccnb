<?php
/**
 * Faith Church logo (built-in vector, traced from the church's own logo).
 * $args['light'] = light colors for dark backgrounds; $args['mono'] = one-color white; $args['full'] = with the NEW BRAUNFELS, TEXAS line.
 */
$full    = ! empty( $args['full'] );
$variant = ! empty( $args['mono'] ) ? ' is-mono' : ( ! empty( $args['light'] ) ? ' is-light' : '' );
?>
<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="wordmark<?php echo esc_attr( $variant . ( $full ? ' is-full' : '' ) ); ?>" aria-label="<?php echo esc_attr( get_bloginfo( 'name' ) . ', home' ); ?>">
	<?php echo faith_logo_svg( $full ); // phpcs:ignore WordPress.Security.EscapeOutput -- bundled theme file ?>
</a>
