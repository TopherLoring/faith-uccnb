<?php
/**
 * Site footer.
 */
$o = faith_opts();
?>
</main>

<footer class="site-footer">
	<section class="still-speaking" aria-label="God is still speaking">
		<div class="wrap still-inner">
			<a class="still-comma reveal" href="https://www.ucc.org" target="_blank" rel="noopener">
				<img src="<?php echo esc_url( faith_img( 'ucc-comma-rainbow.png' ) ); ?>" alt="United Church of Christ comma" width="640" height="640" loading="lazy">
			</a>
			<div class="still-text">
				<p class="still-tagline reveal" style="--i:1"><span class="still-green">God is still</span> <span class="still-blue">speaking,</span></p>
				<p class="still-cite reveal" style="--i:2">“Never place a period where God has placed a comma.” — Gracie Allen, the line behind the UCC’s comma</p>
			</div>
		</div>
	</section>
	<div class="wrap footer-inner">

		<div class="footer-grid">
			<div>
				<?php get_template_part( 'parts/wordmark', null, array( 'light' => true ) ); ?>
				<p class="footer-about">A progressive, Open and Affirming congregation of the United Church of Christ in New Braunfels since 1966.</p>
			</div>

			<div>
				<p class="eyebrow eyebrow-light">Sundays</p>
				<ul class="footer-list">
					<?php foreach ( faith_get_gatherings() as $g ) : ?>
						<?php if ( $g['weekly'] ) : ?>
							<li><?php echo esc_html( $g['title'] . ( $g['time'] ? ' · ' . $g['time'] : '' ) ); ?></li>
						<?php endif; ?>
					<?php endforeach; ?>
					<?php if ( $o['communion_first_sunday'] ) : ?>
						<li>Communion · first Sundays</li>
					<?php endif; ?>
				</ul>
				<a class="footer-cta link-underline" href="<?php echo esc_url( $o['zoom_url'] ); ?>" target="_blank" rel="noopener">Join on Zoom →</a>
			</div>

			<div>
				<p class="eyebrow eyebrow-light">Contact</p>
				<address class="footer-list">
					<a class="link-underline" href="<?php echo esc_url( $o['maps_url'] ); ?>" target="_blank" rel="noopener"><?php echo esc_html( $o['street'] ); ?><br><?php echo esc_html( $o['city'] . ', ' . $o['state'] . ' ' . $o['zip'] ); ?></a>
					<a class="link-underline" href="<?php echo esc_url( $o['phone_href'] ); ?>"><?php echo esc_html( $o['phone'] ); ?></a>
					<a class="link-underline break" href="mailto:<?php echo esc_attr( $o['email'] ); ?>"><?php echo esc_html( $o['email'] ); ?></a>
				</address>
			</div>

			<div>
				<p class="eyebrow eyebrow-light">More</p>
				<ul class="footer-list">
					<li><a class="link-underline" href="<?php echo esc_url( faith_page_url( 'visit' ) ); ?>">Plan a visit</a></li>
					<li><a class="link-underline" href="<?php echo esc_url( faith_page_url( 'news' ) ); ?>">News &amp; Glimpses of Faith</a></li>
					<li><a class="link-underline" href="<?php echo esc_url( get_post_type_archive_link( 'faith_event' ) ); ?>">All events</a></li>
					<li><a class="link-underline" href="<?php echo esc_url( faith_page_url( 'give' ) ); ?>">Give</a></li>
					<?php if ( $o['photos_url'] ) : ?><li><a class="link-underline" href="<?php echo esc_url( $o['photos_url'] ); ?>" target="_blank" rel="noopener">Photo album</a></li><?php endif; ?>
					<?php if ( $o['rental_url'] ) : ?><li><a class="link-underline" href="<?php echo esc_url( $o['rental_url'] ); ?>">Rent our space</a></li><?php endif; ?>
					<?php if ( $o['directory_url'] ) : ?><li><a class="link-underline" href="<?php echo esc_url( $o['directory_url'] ); ?>">Member directory</a></li><?php endif; ?>
				</ul>
			</div>
		</div>

		<div class="footer-ucc">
			<a href="https://www.ucc.org" target="_blank" rel="noopener" class="ucc-badge">
				<img src="<?php echo esc_url( faith_img( 'ucc-logo-rainbow.png' ) ); ?>" alt="United Church of Christ" width="900" height="266" loading="lazy">
			</a>
			<p class="small">Faith is a congregation of the United Church of Christ, and Open and Affirming since 2009.</p>
		</div>

		<div class="footer-base">
			<p>© <?php echo esc_html( wp_date( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?> · New Braunfels, Texas</p>
			<div class="footer-social">
				<?php if ( $o['facebook_url'] ) : ?><a class="link-underline" href="<?php echo esc_url( $o['facebook_url'] ); ?>" target="_blank" rel="noopener">Facebook</a><?php endif; ?>
				<?php if ( $o['twitter_url'] ) : ?><a class="link-underline" href="<?php echo esc_url( $o['twitter_url'] ); ?>" target="_blank" rel="noopener">X / Twitter</a><?php endif; ?>
				<a class="link-underline" href="https://www.ucc.org" target="_blank" rel="noopener">ucc.org</a>
				<?php if ( is_user_logged_in() && current_user_can( 'edit_pages' ) ) : ?>
					<a class="link-underline" href="<?php echo esc_url( admin_url() ); ?>">Update the site</a>
				<?php else : ?>
					<a class="link-underline" href="<?php echo esc_url( wp_login_url() ); ?>">Staff login</a>
				<?php endif; ?>
			</div>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
