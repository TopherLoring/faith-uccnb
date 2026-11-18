<?php
/**
 * In the community: partners, events, regular gatherings.
 */
get_header();
the_post();
$partners   = get_posts( array( 'post_type' => 'faith_partner', 'posts_per_page' => 30, 'orderby' => 'menu_order', 'order' => 'ASC' ) );
$events     = faith_upcoming_events( 30 );
$gatherings = faith_get_gatherings();

get_template_part( 'parts/page-intro', null, array( 'eyebrow' => 'In the community' ) );
?>

<section class="wrap">
	<div class="trio">
		<?php faith_figure( faith_img( 'big-serve-build.webp' ), 'A volunteer cutting plywood on a sawhorse table outdoors', array( 'ratio' => 'tall' ) ); ?>
		<?php faith_figure( faith_img( 'big-serve-crafts.webp' ), 'Volunteers and kids doing crafts around a table', array( 'ratio' => 'tall', 'class' => 'trio-offset', 'i' => 1 ) ); ?>
		<?php faith_figure( faith_img( 'big-serve-crowd.webp' ), 'A large group of volunteers in matching shirts inside a food bank', array( 'ratio' => 'tall', 'i' => 2 ) ); ?>
	</div>
	<p class="caption reveal">Big Serve NB volunteer days.</p>
</section>

<?php if ( $partners ) : ?>
<section class="wrap section" id="partners">
	<div class="section-head">
		<div class="reveal">
			<p class="eyebrow">Who we work with</p>
			<h2 class="display-lg">Where you’ll find us.</h2>
		</div>
		<div class="lede reveal" style="--i:1"><p>Some of these we joined. A couple we started. Tap one to learn more, or go straight to the partner.</p></div>
	</div>
	<div class="partners" data-partners>
		<ul class="partner-list">
			<?php foreach ( $partners as $i => $p ) : ?>
				<?php
				$pid   = 'partner-' . $p->ID;
				$img   = get_the_post_thumbnail_url( $p, 'large' );
				$url   = get_post_meta( $p->ID, 'faith_url', true );
				$since = get_post_meta( $p->ID, 'faith_since', true );
				?>
				<li class="acc partner reveal" style="--i:<?php echo (int) min( $i, 5 ); ?>" data-acc<?php echo 0 === $i ? ' data-open="true"' : ''; ?> data-img="<?php echo esc_url( $img ? $img : '' ); ?>">
					<button type="button" class="acc-btn partner-btn" aria-expanded="<?php echo 0 === $i ? 'true' : 'false'; ?>" aria-controls="<?php echo esc_attr( $pid ); ?>">
						<span>
							<span class="display-md partner-name"><?php echo esc_html( get_the_title( $p ) ); ?></span>
							<span class="small muted partner-role"><?php echo esc_html( get_post_meta( $p->ID, 'faith_role', true ) ); ?></span>
						</span>
						<span class="small strong muted"><?php echo esc_html( $since ); ?></span>
					</button>
					<div class="acc-body" id="<?php echo esc_attr( $pid ); ?>" role="region"><div><div class="acc-inner muted">
						<?php echo faith_paragraphs( get_post_meta( $p->ID, 'faith_blurb', true ) ); // phpcs:ignore ?>
						<?php if ( $url ) : ?>
							<a class="text-link" href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener"><span class="link-underline"><?php echo esc_html( preg_replace( '#^https?://(www\.)?#', '', untrailingslashit( $url ) ) ); ?></span> <?php echo faith_icon( 'arrow-up-right' ); // phpcs:ignore ?></a>
						<?php endif; ?>
					</div></div></div>
				</li>
			<?php endforeach; ?>
		</ul>
		<div class="partner-aside">
			<div class="partner-sticky">
				<?php faith_figure( faith_img( 'sos-food-bank.webp' ), 'The red SOS sign on the Spirit of Sharing food bank building', array( 'ratio' => '4-5', 'caption' => 'Spirit of Sharing, New Braunfels.', 'reveal' => false, 'class' => 'partner-figure' ) ); ?>
			</div>
		</div>
	</div>
</section>
<?php endif; ?>

<section class="band band-deep" id="gatherings">
	<div class="wrap">
		<div class="section-head">
			<div class="reveal">
				<p class="eyebrow">Events &amp; gatherings</p>
				<h2 class="display-lg">Ways to just show up.</h2>
			</div>
			<div class="lede reveal" style="--i:1"><p>No sign-ups, no commitment. Dates update automatically.</p></div>
		</div>

		<?php if ( $events ) : ?>
			<h3 class="sub-head reveal">Coming up</h3>
			<div class="event-grid" data-date-list data-limit="99">
				<?php foreach ( $events as $i => $e ) : ?>
					<a class="event-card reveal" style="--i:<?php echo (int) min( $i, 5 ); ?>" href="<?php echo esc_url( $e['url'] ); ?>"<?php echo faith_date_attrs( $e['date'] ); // phpcs:ignore ?>>
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
				<?php endforeach; ?>
			</div>
			<h3 class="sub-head reveal">Every week, every month</h3>
		<?php endif; ?>

		<div class="gathering-grid">
			<?php foreach ( $gatherings as $i => $g ) : ?>
				<article class="gathering reveal" style="--i:<?php echo (int) ( $i % 3 ); ?>">
					<div class="gathering-top">
						<p class="gathering-when"><?php echo esc_html( $g['when'] ); ?></p>
						<p class="small muted" data-next<?php echo faith_date_attrs( $g['date'], $g['token'] ); // phpcs:ignore ?>>Next: <span data-fmt="short"><?php echo esc_html( faith_fmt_date( $g['date'], 'D, M j' ) ); ?></span></p>
					</div>
					<h3 class="display-md"><?php echo esc_html( $g['title'] ); ?></h3>
					<?php if ( $g['time'] ) : ?><p class="small strong"><?php echo esc_html( $g['time'] ); ?></p><?php endif; ?>
					<p class="muted"><?php echo esc_html( $g['blurb'] ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="wrap section">
	<div class="callout">
		<div class="reveal">
			<p class="eyebrow">Stay in the loop</p>
			<h2 class="display-md">Glimpses of Faith, our newsletter, has the details on everything above.</h2>
		</div>
		<a class="btn btn-primary reveal" style="--i:1" href="<?php echo esc_url( faith_page_url( 'news' ) ); ?>">Read the news <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
	</div>
</section>

<?php
get_template_part(
	'parts/where-next',
	null,
	array(
		'links' => array(
			array( 'Your first Sunday', 'What to expect', faith_page_url( 'visit' ), 'choir.webp' ),
			array( 'Our story', 'Sixty years on Loop 337', faith_page_url( 'about', 'history' ), 'sanctuary.webp' ),
			array( 'Give', 'Fund the work', faith_page_url( 'give' ), 'still-speaking-banner.webp' ),
		),
	)
);
get_footer();
