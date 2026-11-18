<?php
/**
 * Plan a visit.
 */
get_header();
the_post();
$o         = faith_opts();
$gatherings = faith_get_gatherings();
$sunday     = array_values( array_filter( $gatherings, fn( $g ) => $g['weekly'] && false !== strpos( $g['token'], 'weekly:0' ) ) );
$faqs       = get_posts( array( 'post_type' => 'faith_faq', 'posts_per_page' => 30, 'orderby' => 'menu_order', 'order' => 'ASC' ) );

get_template_part(
	'parts/page-intro',
	null,
	array(
		'eyebrow' => 'Plan a visit',
		'after'   => function () use ( $o ) {
			?>
			<div class="intro-meta fade-in" style="--d:.8s">
				<?php get_template_part( 'parts/sunday-status' ); ?>
				<a class="small strong" href="<?php echo esc_url( $o['maps_url'] ); ?>" target="_blank" rel="noopener"><span class="link-underline"><?php echo esc_html( $o['address_line'] ); ?></span></a>
			</div>
			<?php
		},
	)
);
?>

<section class="wrap">
	<?php faith_figure( faith_img( 'sanctuary.webp' ), 'Faith’s sanctuary from the back pews, with wooden rafters and rainbow ribbons overhead', array( 'ratio' => 'cinema', 'caption' => 'The sanctuary, ' . $o['street'] . '. In use since July 4, 1999.', 'eager' => true ) ); ?>
</section>

<section class="wrap section">
	<div class="section-head">
		<div class="reveal">
			<p class="eyebrow">Sunday morning</p>
			<h2 class="display-lg">How the morning goes.</h2>
		</div>
		<div class="lede reveal" style="--i:1">
			<p>Worship runs <?php echo esc_html( faith_time_range( $o['worship_start'], $o['worship_end'] ) ); ?>. Nobody will single you out, and nobody will mind if you just watch.</p>
		</div>
	</div>
	<ol class="timeline-list">
		<li class="tl-row reveal">
			<p class="tl-time">Before <?php echo esc_html( faith_time_label( $o['worship_start'] ) ); ?></p>
			<p class="tl-title">Find a seat</p>
			<p class="muted">Arrive a few minutes early, or right on time. Sit wherever you like. Joining from home? Open the Zoom link a little before the service.</p>
		</li>
		<?php foreach ( $sunday as $i => $g ) : ?>
			<li class="tl-row reveal" style="--i:<?php echo (int) ( $i + 1 ); ?>">
				<p class="tl-time"><?php echo esc_html( $g['time'] ? strtok( $g['time'], '–' ) : 'Sunday' ); ?></p>
				<p class="tl-title"><?php echo esc_html( $g['title'] ); ?></p>
				<p class="muted"><?php echo esc_html( $g['blurb'] ); ?></p>
			</li>
		<?php endforeach; ?>
		<?php if ( $o['communion_first_sunday'] ) : ?>
			<li class="tl-row reveal" style="--i:<?php echo count( $sunday ) + 1; ?>">
				<p class="tl-time">1st Sundays</p>
				<p class="tl-title">Communion</p>
				<p class="muted">On the first Sunday of the month we share communion. Everyone is invited. You don’t need to be a member, or baptized, or sure.</p>
			</li>
		<?php endif; ?>
	</ol>
</section>

<section class="band band-moss">
	<div class="wrap split">
		<div class="reveal">
			<p class="eyebrow eyebrow-light">Not ready to walk in?</p>
			<h2 class="display-lg">Watch from your couch first.</h2>
			<p class="lede lede-light">Every Sunday service streams live on Zoom. Camera off, pajamas on, no one will ask you to introduce yourself.</p>
			<div class="btn-row">
				<a class="btn btn-paper" href="<?php echo esc_url( $o['zoom_url'] ); ?>" target="_blank" rel="noopener">Open the Zoom link <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
				<?php if ( $o['zoom_id'] ) : ?><span class="small light-muted">Meeting ID <?php echo esc_html( $o['zoom_id'] ); ?></span><?php endif; ?>
			</div>
		</div>
		<?php faith_figure( faith_img( 'candles.webp' ), 'A pastor at the altar behind a table of lit candles, with a rainbow banner hanging nearby', array( 'i' => 1 ) ); ?>
	</div>
</section>

<?php if ( $faqs ) : ?>
<section class="wrap section" id="faq">
	<div class="section-head">
		<div class="reveal">
			<p class="eyebrow">Questions people ask</p>
			<h2 class="display-lg">The honest answers.</h2>
		</div>
	</div>
	<div class="accordion-list">
		<?php foreach ( $faqs as $f ) : ?>
			<?php $aid = 'faq-' . $f->ID; ?>
			<div class="acc" data-acc>
				<h3>
					<button type="button" class="acc-btn" aria-expanded="false" aria-controls="<?php echo esc_attr( $aid ); ?>">
						<span class="display-md acc-q"><?php echo esc_html( get_the_title( $f ) ); ?></span>
						<span class="circle-btn acc-icon"><?php echo faith_icon( 'plus' ); // phpcs:ignore ?></span>
					</button>
				</h3>
				<div class="acc-body" id="<?php echo esc_attr( $aid ); ?>" role="region"><div><div class="acc-inner muted"><?php echo faith_paragraphs( get_post_meta( $f->ID, 'faith_blurb', true ) ); // phpcs:ignore ?></div></div></div>
			</div>
		<?php endforeach; ?>
	</div>
</section>
<?php endif; ?>

<section class="wrap section" id="directions">
	<div class="directions">
		<div class="reveal">
			<p class="eyebrow">Getting here</p>
			<h2 class="display-lg"><?php echo esc_html( $o['street'] ); ?>.</h2>
			<address class="muted directions-addr">
				<p><?php echo esc_html( $o['city'] . ', ' . $o['state'] . ' ' . $o['zip'] ); ?></p>
				<p><a class="link-underline" href="<?php echo esc_url( $o['phone_href'] ); ?>"><?php echo esc_html( $o['phone'] ); ?></a></p>
				<p><a class="link-underline break" href="mailto:<?php echo esc_attr( $o['email'] ); ?>"><?php echo esc_html( $o['email'] ); ?></a></p>
			</address>
			<a class="btn btn-primary" href="<?php echo esc_url( $o['maps_url'] ); ?>" target="_blank" rel="noopener">Get directions <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
			<?php faith_figure( faith_img( 'still-speaking-banner.webp' ), 'The church building with a rainbow “God is still speaking” banner out front', array( 'caption' => 'Look for the rainbow banner.', 'class' => 'directions-photo', 'reveal' => false ) ); ?>
		</div>
		<div class="map photo reveal" style="--i:1">
			<iframe title="Map to <?php echo esc_attr( get_bloginfo( 'name' ) ); ?>" src="<?php echo esc_url( $o['maps_embed'] ); ?>" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
		</div>
	</div>
</section>

<?php
get_template_part(
	'parts/where-next',
	null,
	array(
		'links' => array(
			array( 'Who we are', 'What Open and Affirming means here', faith_page_url( 'about' ), 'clergy.webp' ),
			array( 'Events & gatherings', 'Theology on Tap, game night, socials', faith_page_url( 'community', 'gatherings' ), 'big-serve-crafts.webp' ),
			array( 'Our story', 'Sixty years on Loop 337', faith_page_url( 'about', 'history' ), 'sanctuary.webp' ),
		),
	)
);
get_footer();
