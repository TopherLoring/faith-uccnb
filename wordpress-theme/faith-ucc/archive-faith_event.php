<?php
/**
 * /events/ — every upcoming event. (The Community page shows the same list with gatherings.)
 */
get_header();
?>
<section class="wrap page-intro">
	<p class="eyebrow fade-in" style="--d:.1s">Events</p>
	<?php faith_headline( "What’s\n*coming up.*" ); ?>
	<div class="lede fade-in page-lede" style="--d:.55s"><p>Special services, potlucks, speakers. For the weekly and monthly rhythm, see <a class="link-underline" href="<?php echo esc_url( faith_page_url( 'community', 'gatherings' ) ); ?>">gatherings</a>.</p></div>
</section>
<section class="wrap">
	<?php if ( have_posts() ) : ?>
		<div class="event-grid" data-date-list data-limit="99">
			<?php
			$i = 0;
			while ( have_posts() ) :
				the_post();
				$e = faith_event_data( get_post() );
				?>
				<a class="event-card reveal" style="--i:<?php echo (int) min( $i++, 5 ); ?>" href="<?php echo esc_url( $e['url'] ); ?>"<?php echo faith_date_attrs( $e['date'] ); // phpcs:ignore ?>>
					<div class="date-badge">
						<p class="date-day"><?php echo esc_html( faith_fmt_date( $e['date'], 'j' ) ); ?></p>
						<p class="date-mon"><?php echo esc_html( faith_fmt_date( $e['date'], 'M D' ) ); ?></p>
					</div>
					<div>
						<p class="event-title"><?php echo esc_html( $e['title'] ); ?></p>
						<p class="small strong"><?php echo esc_html( trim( $e['time'] . ( $e['location'] ? ' · ' . $e['location'] : '' ), ' ·' ) ); ?></p>
						<?php if ( $e['blurb'] ) : ?><p class="muted small"><?php echo esc_html( $e['blurb'] ); ?></p><?php endif; ?>
					</div>
				</a>
			<?php endwhile; ?>
		</div>
	<?php else : ?>
		<p class="lede">No special events on the calendar right now. Our <a class="link-underline" href="<?php echo esc_url( faith_page_url( 'community', 'gatherings' ) ); ?>">regular gatherings</a> happen every week and month.</p>
	<?php endif; ?>
</section>
<?php
get_footer();
