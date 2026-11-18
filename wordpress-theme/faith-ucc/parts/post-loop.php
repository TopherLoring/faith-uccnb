<?php
/**
 * Grid of posts for the main query, with pagination.
 */
?>
<section class="wrap">
	<?php if ( have_posts() ) : ?>
		<div class="post-grid">
			<?php
			$i = 0;
			while ( have_posts() ) :
				the_post();
				get_template_part( 'parts/post-card', null, array( 'post' => get_post(), 'i' => $i++ % 3 ) );
			endwhile;
			?>
		</div>
		<nav class="pager" aria-label="More posts">
			<?php
			echo wp_kses_post(
				paginate_links(
					array(
						'prev_text' => '← Newer',
						'next_text' => 'Older →',
						'mid_size'  => 1,
					)
				) ?? ''
			);
			?>
		</nav>
	<?php else : ?>
		<p class="lede">Nothing here yet.</p>
	<?php endif; ?>
</section>
