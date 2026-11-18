<?php
/**
 * End-of-page cross links. $args['links'] = [ [label, note, url, image file], ... ]
 */
$links = $args['links'] ?? array();
?>
<section class="wrap where-next">
	<p class="eyebrow reveal">Where to next</p>
	<div class="where-grid">
		<?php foreach ( $links as $i => $l ) : ?>
			<a class="where-card reveal" style="--i:<?php echo (int) $i; ?>" href="<?php echo esc_url( $l[2] ); ?>">
				<div class="photo ratio-4-3"><img src="<?php echo esc_url( faith_img( $l[3] ) ); ?>" alt="" loading="lazy"></div>
				<div class="where-text">
					<div>
						<p class="display-md where-label"><?php echo esc_html( $l[0] ); ?></p>
						<p class="muted small"><?php echo esc_html( $l[1] ); ?></p>
					</div>
					<span class="circle-btn"><?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></span>
				</div>
			</a>
		<?php endforeach; ?>
	</div>
</section>
