<?php
/**
 * Opening block for designed pages: eyebrow, big headline (editable), lede (page content).
 */
$eyebrow = $args['eyebrow'] ?? get_the_title();
?>
<section class="wrap page-intro">
	<p class="eyebrow fade-in" style="--d:.1s"><?php echo esc_html( $eyebrow ); ?></p>
	<?php faith_headline( faith_page_headline() ); ?>
	<?php if ( trim( get_the_content() ) ) : ?>
		<div class="lede fade-in page-lede" style="--d:.55s"><?php the_content(); ?></div>
	<?php endif; ?>
	<?php
	if ( ! empty( $args['after'] ) && is_callable( $args['after'] ) ) {
		call_user_func( $args['after'] );
	}
	?>
</section>
