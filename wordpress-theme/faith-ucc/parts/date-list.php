<?php
/**
 * A dated list (events + monthly gatherings). theme.js keeps it current on cached pages.
 * $args: items (from faith_coming_up), limit.
 */
$items = $args['items'] ?? array();
$limit = (int) ( $args['limit'] ?? 4 );
$show_communion = (bool) faith_opt( 'communion_first_sunday' );
?>
<ol class="date-list" data-date-list data-limit="<?php echo (int) $limit; ?>">
	<?php foreach ( $items as $i => $it ) : ?>
		<li class="date-row reveal<?php echo $i >= $limit ? ' is-extra' : ''; ?>" style="--i:<?php echo (int) min( $i, 5 ); ?>"<?php echo faith_date_attrs( $it['date'], $it['token'] ); // phpcs:ignore ?>>
			<div class="date-badge">
				<p class="date-day" data-fmt="day"><?php echo esc_html( faith_fmt_date( $it['date'], 'j' ) ); ?></p>
				<p class="date-mon" data-fmt="mon"><?php echo esc_html( faith_fmt_date( $it['date'], 'M D' ) ); ?></p>
			</div>
			<div>
				<p class="date-title">
					<?php if ( $it['url'] ) : ?>
						<a class="link-underline" href="<?php echo esc_url( $it['url'] ); ?>"><?php echo esc_html( $it['title'] ); ?></a>
					<?php else : ?>
						<?php echo esc_html( $it['title'] ); ?>
					<?php endif; ?>
					<?php if ( $it['time'] ) : ?><span class="date-time"><?php echo esc_html( $it['time'] ); ?></span><?php endif; ?>
				</p>
				<?php if ( $it['blurb'] ) : ?><p class="muted"><?php echo esc_html( $it['blurb'] ); ?></p><?php endif; ?>
			</div>
		</li>
	<?php endforeach; ?>
</ol>
