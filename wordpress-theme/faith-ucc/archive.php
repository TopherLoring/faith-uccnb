<?php
/**
 * Category, tag, date and author archives.
 */
get_header();
?>
<section class="wrap page-intro">
	<p class="eyebrow fade-in" style="--d:.1s"><a class="link-underline" href="<?php echo esc_url( faith_page_url( 'news' ) ); ?>">News</a></p>
	<?php faith_headline( wp_strip_all_tags( get_the_archive_title() ) ); ?>
	<?php if ( get_the_archive_description() ) : ?>
		<div class="lede fade-in page-lede" style="--d:.55s"><?php the_archive_description(); ?></div>
	<?php endif; ?>
</section>
<?php get_template_part( 'parts/post-loop' ); ?>
<?php
get_footer();
