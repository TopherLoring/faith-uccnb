<?php
/**
 * News (posts page) with category filter chips.
 */
get_header();
$news_page = (int) get_option( 'page_for_posts' );
$headline  = $news_page ? faith_page_headline( $news_page ) : 'News';
$cats      = get_categories( array( 'orderby' => 'count', 'order' => 'DESC', 'number' => 6, 'hide_empty' => true ) );
// Hide the auto-generated month categories ("April 2021") from the chips.
$cats      = array_values( array_filter( $cats, fn( $c ) => ! preg_match( '/^(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}$/', $c->name ) && 'uncategorized' !== $c->slug ) );
?>
<section class="wrap page-intro">
	<p class="eyebrow fade-in" style="--d:.1s">News &amp; notes</p>
	<?php faith_headline( $headline ); ?>
	<?php if ( $cats ) : ?>
		<nav class="chips fade-in news-chips" style="--d:.6s" aria-label="News categories">
			<a class="chip is-on" href="<?php echo esc_url( faith_page_url( 'news' ) ); ?>">Everything</a>
			<?php foreach ( $cats as $c ) : ?>
				<a class="chip" href="<?php echo esc_url( get_category_link( $c ) ); ?>"><?php echo esc_html( $c->name ); ?></a>
			<?php endforeach; ?>
		</nav>
	<?php endif; ?>
</section>
<?php get_template_part( 'parts/post-loop' ); ?>
<?php get_template_part( 'parts/newsletter' ); ?>
<?php
get_footer();
