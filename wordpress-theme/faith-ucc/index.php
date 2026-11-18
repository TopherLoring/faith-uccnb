<?php
/**
 * Fallback (search results and anything else).
 */
get_header();
?>
<section class="wrap page-intro">
	<p class="eyebrow fade-in" style="--d:.1s"><?php echo is_search() ? 'Search' : 'Faith UCC'; ?></p>
	<?php faith_headline( is_search() ? 'Results for “' . get_search_query() . '”' : wp_strip_all_tags( get_the_archive_title() ) ); ?>
	<?php if ( is_search() ) : ?>
		<div class="fade-in search-again" style="--d:.6s"><?php get_template_part( 'parts/search-form', null, array( 'id' => 'search-page' ) ); ?></div>
	<?php endif; ?>
</section>
<?php get_template_part( 'parts/post-loop' ); ?>
<?php
get_footer();
