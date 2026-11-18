<?php
/**
 * Any other page (old pages carried over from the previous site land here).
 */
get_header();
the_post();
?>
<article class="article">
	<header class="wrap article-head">
		<?php faith_headline( faith_page_headline(), 'h1', 'display-lg article-title' ); ?>
	</header>
	<div class="wrap"><div class="entry fade-in" style="--d:.4s"><?php the_content(); ?></div></div>
</article>
<?php
get_footer();
