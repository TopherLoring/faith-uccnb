<?php
/**
 * Glimpses of Faith sign-up. Uses the church's Constant Contact form when that plugin is active;
 * otherwise a button to the sign-up page.
 */
$o       = faith_opts();
$form_id = preg_replace( '/\D/', '', (string) $o['newsletter_form_id'] );
$form    = ( $form_id && shortcode_exists( 'ctct' ) ) ? do_shortcode( '[ctct form="' . $form_id . '" show_title="false"]' ) : '';
if ( ! $form && ! $o['newsletter_url'] ) {
	return;
}
?>
<section class="wrap section">
	<div class="newsletter">
		<div class="reveal">
			<p class="eyebrow">Glimpses of Faith</p>
			<h2 class="display-md">The monthly newsletter, <em class="accent">in your inbox.</em></h2>
			<p class="muted newsletter-note">News, the month ahead, and what we’re up to in New Braunfels. Once a month, no spam.</p>
		</div>
		<div class="newsletter-action reveal" style="--i:1">
			<?php if ( $form ) : ?>
				<div class="newsletter-form"><?php echo $form; // phpcs:ignore -- plugin output ?></div>
			<?php else : ?>
				<a class="btn btn-primary" href="<?php echo esc_url( $o['newsletter_url'] ); ?>"><?php echo faith_icon( 'mail' ); // phpcs:ignore ?> Sign up for the newsletter</a>
			<?php endif; ?>
		</div>
	</div>
</section>
