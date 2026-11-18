<?php
/**
 * A single news post.
 */
get_header();
the_post();
$cat = faith_post_category( get_post() );
?>
<article class="article">
	<header class="wrap article-head">
		<p class="eyebrow fade-in" style="--d:.1s">
			<a class="link-underline" href="<?php echo esc_url( faith_page_url( 'news' ) ); ?>">News</a>
			<?php if ( $cat ) : ?> · <a class="link-underline" href="<?php echo esc_url( get_category_link( $cat ) ); ?>"><?php echo esc_html( $cat->name ); ?></a><?php endif; ?>
		</p>
		<?php faith_headline( get_the_title(), 'h1', 'display-lg article-title' ); ?>
		<p class="small muted fade-in" style="--d:.5s"><?php echo esc_html( get_the_date() ); ?></p>
	</header>
	<?php if ( has_post_thumbnail() ) : ?>
		<div class="wrap article-hero fade-in" style="--d:.4s"><div class="photo"><?php the_post_thumbnail( 'faith-wide' ); ?></div></div>
	<?php endif; ?>
	<div class="wrap">
		<div class="entry fade-in" style="--d:.6s"><?php the_content(); ?></div>
		<nav class="article-nav">
			<div><?php previous_post_link( '%link', '← %title' ); ?></div>
			<div><?php next_post_link( '%link', '%title →' ); ?></div>
		</nav>
	</div>
</article>
<?php
get_template_part(
	'parts/where-next',
	null,
	array(
		'links' => array(
			array( 'All news', 'Glimpses of Faith and announcements', faith_page_url( 'news' ), 'choir.webp' ),
			array( 'Events & gatherings', 'What’s coming up', faith_page_url( 'community', 'gatherings' ), 'candles.webp' ),
			array( 'Your first Sunday', 'Come see for yourself', faith_page_url( 'visit' ), 'childrens-sermon.webp' ),
		),
	)
);
get_footer();
