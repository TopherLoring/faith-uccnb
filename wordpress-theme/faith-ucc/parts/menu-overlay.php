<?php
/**
 * Full-screen menu: every destination, with a photo preview on hover.
 */
$o     = faith_opts();
$items = array(
	array( 'Your first Sunday', 'Times, kids, communion, what to expect', faith_page_url( 'visit' ), 'childrens-sermon.webp' ),
	array( 'Who we are', 'Progressive, Open and Affirming, UCC', faith_page_url( 'about' ), 'clergy.webp' ),
	array( 'Our story', 'From 30 people in 1966 to now', faith_page_url( 'about', 'history' ), 'sanctuary.webp' ),
	array( 'Pastor', $o['pastor_name'], faith_page_url( 'about', 'pastor' ), '' ),
	array( 'In the community', 'SOS, Family Promise, LEAP, Kiva, MLK', faith_page_url( 'community' ), 'big-serve-crowd.webp' ),
	array( 'Events & gatherings', 'Theology on Tap, game night, socials', faith_page_url( 'community', 'gatherings' ), 'candles.webp' ),
	array( 'News', 'Glimpses of Faith and announcements', faith_page_url( 'news' ), 'choir.webp' ),
	array( 'Give', 'Online giving and pledges', faith_page_url( 'give' ), 'still-speaking-banner.webp' ),
);
?>
<div id="site-menu" class="menu-overlay" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden="true" inert data-menu>
	<div class="wrap menu-top">
		<?php get_template_part( 'parts/wordmark', null, array( 'mono' => true ) ); ?>
		<button type="button" class="menu-close" data-menu-close>Close <?php echo faith_icon( 'close' ); // phpcs:ignore ?></button>
	</div>
	<div class="wrap menu-body">
		<nav aria-label="All pages">
			<ul class="menu-list">
				<?php foreach ( $items as $i => $it ) : ?>
					<li class="menu-item" style="--i:<?php echo (int) $i; ?>">
						<a href="<?php echo esc_url( $it[2] ); ?>" data-menu-link data-preview="<?php echo (int) $i; ?>">
							<span class="menu-label"><?php echo esc_html( $it[0] ); ?></span>
							<span class="menu-note"><?php echo esc_html( $it[1] ); ?></span>
						</a>
					</li>
				<?php endforeach; ?>
			</ul>
		</nav>
		<aside class="menu-aside">
			<div class="menu-preview photo">
				<?php foreach ( $items as $i => $it ) : ?>
					<img src="<?php echo esc_url( $it[3] ? faith_img( $it[3] ) : faith_pastor_photo_url() ); ?>" alt="" loading="lazy" data-preview-img="<?php echo (int) $i; ?>"<?php echo 0 === $i ? ' class="is-active"' : ''; ?>>
				<?php endforeach; ?>
			</div>
			<div class="menu-item menu-info" style="--i:<?php echo count( $items ); ?>">
				<div>
					<p class="eyebrow eyebrow-light">Sunday</p>
					<?php get_template_part( 'parts/sunday-status', null, array( 'light' => true ) ); ?>
					<a class="link-underline menu-zoom" href="<?php echo esc_url( $o['zoom_url'] ); ?>" target="_blank" rel="noopener">Zoom link<?php echo $o['zoom_id'] ? ' · ID ' . esc_html( $o['zoom_id'] ) : ''; ?></a>
				</div>
				<div>
					<p class="eyebrow eyebrow-light">Find us</p>
					<a class="link-underline" href="<?php echo esc_url( $o['maps_url'] ); ?>" target="_blank" rel="noopener"><?php echo esc_html( $o['address_line'] ); ?></a>
					<p><a class="link-underline" href="<?php echo esc_url( $o['phone_href'] ); ?>"><?php echo esc_html( $o['phone'] ); ?></a></p>
				</div>
			</div>
		</aside>
	</div>
</div>
