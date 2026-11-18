<?php
/**
 * A single event.
 */
get_header();
the_post();
$e = faith_event_data( get_post() );
$o = faith_opts();
?>
<article class="article">
	<header class="wrap article-head">
		<p class="eyebrow fade-in" style="--d:.1s"><a class="link-underline" href="<?php echo esc_url( faith_page_url( 'community', 'gatherings' ) ); ?>">Events</a></p>
		<?php faith_headline( get_the_title(), 'h1', 'display-lg article-title' ); ?>
		<dl class="event-facts fade-in" style="--d:.5s">
			<?php if ( $e['date'] ) : ?><div><dt>When</dt><dd><?php echo esc_html( faith_fmt_date( $e['date'], 'l, F j, Y' ) ); ?><?php echo $e['time'] ? '<br>' . esc_html( $e['time'] ) : ''; ?></dd></div><?php endif; ?>
			<div><dt>Where</dt><dd><?php echo esc_html( $e['location'] ? $e['location'] : $o['address_line'] ); ?></dd></div>
		</dl>
		<?php if ( $e['date'] && $e['date'] < faith_today() ) : ?>
			<p class="notice fade-in" style="--d:.6s">This event has already happened.</p>
		<?php endif; ?>
		<div class="btn-row fade-in" style="--d:.7s">
			<?php if ( $e['link'] ) : ?><a class="btn btn-primary" href="<?php echo esc_url( $e['link'] ); ?>" target="_blank" rel="noopener">More details <?php echo faith_icon( 'arrow-up-right' ); // phpcs:ignore ?></a><?php endif; ?>
			<a class="btn btn-ghost" href="<?php echo esc_url( $o['maps_url'] ); ?>" target="_blank" rel="noopener">Directions</a>
		</div>
	</header>
	<?php if ( has_post_thumbnail() ) : ?>
		<div class="wrap article-hero fade-in" style="--d:.4s"><div class="photo"><?php the_post_thumbnail( 'faith-wide' ); ?></div></div>
	<?php endif; ?>
	<div class="wrap"><div class="entry fade-in" style="--d:.6s"><?php the_content(); ?></div></div>
</article>
<?php
get_template_part(
	'parts/where-next',
	null,
	array(
		'links' => array(
			array( 'All events', 'Everything coming up', faith_page_url( 'community', 'gatherings' ), 'candles.webp' ),
			array( 'Your first Sunday', 'Come see for yourself', faith_page_url( 'visit' ), 'childrens-sermon.webp' ),
			array( 'News', 'Glimpses of Faith', faith_page_url( 'news' ), 'choir.webp' ),
		),
	)
);
get_footer();
