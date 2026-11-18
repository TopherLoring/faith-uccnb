<?php
/**
 * Not found.
 */
get_header();
?>
<section class="wrap page-intro">
	<p class="eyebrow fade-in" style="--d:.1s">Page not found</p>
	<?php faith_headline( "Never place a period\nwhere God has\nplaced a *comma.*" ); ?>
	<div class="lede fade-in page-lede" style="--d:.6s"><p>That page doesn’t exist anymore, but you’re not at a dead end.</p></div>
	<div class="btn-row fade-in" style="--d:.8s">
		<a class="btn btn-primary" href="<?php echo esc_url( home_url( '/' ) ); ?>">Go home <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
		<button type="button" class="btn btn-ghost" data-menu-open>Open the menu</button>
	</div>
</section>
<?php
get_footer();
