<?php
/**
 * "Coming up" as a swipeable strip of cards: the event's flyer when there is one,
 * otherwise a coloured date tile. theme.js keeps dates and order current on cached pages
 * and drives the arrow buttons.
 * $args: items (from faith_coming_up), limit.
 */
$items = array_slice( $args['items'] ?? array(), 0, (int) ( $args['limit'] ?? 10 ) );
if ( ! $items ) {
	return;
}
$gatherings_url = faith_page_url( 'community', 'gatherings' );
?>
<div class="strip" data-strip>
	<ol class="strip-track" data-date-list data-strip-track aria-label="Coming up">
		<?php foreach ( $items as $i => $it ) : ?>
			<?php
			$tone = $i % 6;
			$url  = $it['url'] ? $it['url'] : $gatherings_url;
			?>
			<li class="ev-card reveal tone-<?php echo (int) $tone; ?><?php echo ( $it['image'] && ! empty( $it['wide'] ) ) ? ' is-wide' : ''; ?>" style="--i:<?php echo (int) min( $i, 5 ); ?>"<?php echo faith_date_attrs( $it['date'], $it['token'] ); // phpcs:ignore ?>>
				<a class="ev-link" href="<?php echo esc_url( $url ); ?>">
					<div class="ev-media<?php echo $it['image'] ? ' has-img' : ''; ?>">
						<span class="ev-kind"><?php echo $it['token'] ? 'Every month' : 'Special event'; ?></span>
						<?php if ( $it['image'] ) : ?>
							<img src="<?php echo esc_url( $it['image'] ); ?>" alt="<?php echo esc_attr( $it['alt'] ); ?>" loading="lazy" decoding="async">
						<?php else : ?>
							<span class="ev-tile" aria-hidden="true">
								<span class="ev-day" data-fmt="day"><?php echo esc_html( faith_fmt_date( $it['date'], 'j' ) ); ?></span>
								<span class="ev-mon" data-fmt="mon"><?php echo esc_html( faith_fmt_date( $it['date'], 'M D' ) ); ?></span>
							</span>
						<?php endif; ?>
					</div>
					<p class="ev-when"><span data-fmt="short"><?php echo esc_html( faith_fmt_date( $it['date'], 'D, M j' ) ); ?></span><?php echo $it['time'] ? ' · ' . esc_html( $it['time'] ) : ''; ?></p>
					<p class="ev-title"><span class="link-underline"><?php echo esc_html( $it['title'] ); ?></span></p>
				</a>
			</li>
		<?php endforeach; ?>
	</ol>
</div>
