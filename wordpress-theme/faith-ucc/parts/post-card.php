<?php
$p   = $args['post'];
$i   = (int) ( $args['i'] ?? 0 );
$img = faith_post_image( $p );
?>
<article class="post-card reveal" style="--i:<?php echo (int) min( $i, 5 ); ?>">
	<a href="<?php echo esc_url( get_permalink( $p ) ); ?>" class="post-card-link">
		<?php if ( $img ) : ?>
			<div class="photo ratio-4-3"><img src="<?php echo esc_url( $img ); ?>" alt="" loading="lazy"></div>
		<?php else : ?>
			<div class="post-card-fallback ratio-4-3 tone-<?php echo (int) ( $p->ID % 3 ); ?>" aria-hidden="true"><span class="post-card-initial"><?php echo esc_html( mb_substr( wp_strip_all_tags( get_the_title( $p ) ), 0, 1 ) ); ?></span></div>
		<?php endif; ?>
		<p class="post-meta"><?php echo esc_html( get_the_date( 'M j, Y', $p ) ); ?><?php $cat = faith_post_category( $p ); echo $cat ? ' · ' . esc_html( $cat->name ) : ''; ?></p>
		<h3 class="post-title"><?php echo esc_html( get_the_title( $p ) ); ?></h3>
		<p class="muted"><?php echo esc_html( wp_trim_words( get_the_excerpt( $p ), 22 ) ); ?></p>
	</a>
</article>
