<?php
/**
 * Who we are: Open and Affirming, what we're about, the UCC, pastor, history.
 */
get_header();
the_post();
$o          = faith_opts();
$milestones = get_posts( array( 'post_type' => 'faith_milestone', 'posts_per_page' => 100, 'orderby' => 'menu_order', 'order' => 'ASC' ) );
usort(
	$milestones,
	function ( $a, $b ) {
		$ya = (int) substr( get_post_meta( $a->ID, 'faith_year', true ), 0, 4 );
		$yb = (int) substr( get_post_meta( $b->ID, 'faith_year', true ), 0, 4 );
		return $ya === $yb ? $a->menu_order <=> $b->menu_order : $ya <=> $yb;
	}
);
$pillars = array(
	array( 'Embrace diversity', 'Every race, age, ability, background, family structure, orientation and gender identity, welcomed into full membership and participation.' ),
	array( 'Explore the mysteries', 'Faith isn’t a test you pass. We read, ask, argue, and leave room for what we don’t know about God and life’s complexities.' ),
	array( 'Serve, for real', 'A spirit of service that shows up as food bank shifts, literacy tutoring, and housing families, not just good intentions.' ),
	array( 'Justice for all creation', 'Following Jesus means caring about who gets left out, in our town and far beyond it, and about the earth itself.' ),
);
$firsts  = array(
	array( '1785', 'Ordains its first African American pastor' ),
	array( '1853', 'Ordains its first woman' ),
	array( '1972', 'Ordains its first openly gay pastor' ),
);
$filters = array(
	'all'     => 'Everything',
	'welcome' => 'Welcome',
	'service' => 'Service',
	'home'    => 'Our home',
);

get_template_part( 'parts/page-intro', null, array( 'eyebrow' => 'Who we are' ) );
?>

<section class="wrap" id="ona">
	<div class="ona">
		<?php faith_figure( faith_img( 'still-speaking-banner.webp' ), 'A rainbow banner reading “God is still speaking” hung outside the church', array( 'ratio' => '4-5', 'class' => 'ona-media' ) ); ?>
		<div class="ona-text">
			<p class="eyebrow reveal">Open and Affirming since 2009</p>
			<h2 class="display-lg reveal" style="--i:1">If you’re LGBTQ+, this is your church too.</h2>
			<figure class="progress-pride reveal" style="--i:2">
				<div class="pp-stripes" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
				<figcaption>Progress Pride colors: the rainbow, with black and brown for LGBTQ+ people of color, and light blue, pink and white for trans people.</figcaption>
			</figure>
			<div class="prose muted reveal" style="--i:2">
				<p>“Open and Affirming” is the UCC’s name for congregations that publicly, officially welcome people of every sexual orientation, gender identity, and gender expression. Faith voted to become one in January 2009, after a long season of listening and conversation across the whole church.</p>
				<p>Our statement goes further than that: people of every race, ethnic background, age, ability, economic situation, marital status, family structure, and faith background are welcomed into full membership and participation. We try to reflect the kind of love Jesus showed, which didn’t come with a guest list.</p>
				<p>It wasn’t new for us in 2009. We’d been blessing same-sex unions since 2002. In 2015, two of our members became the first couple legally married in Comal County.</p>
				<p>And with the wider United Church of Christ, we say it plainly: trans, intersex, and nonbinary people are blessed children of God, and welcome here exactly as they are.</p>
			</div>
			<div class="ona-ucc reveal" style="--i:3">
				<a href="https://www.ucc.org/loveislouder" target="_blank" rel="noopener" class="ucc-just-world">
					<img src="<?php echo esc_url( faith_img( 'ucc-just-world-rainbow.png' ) ); ?>" alt="United Church of Christ: a just world for all" width="700" height="460" loading="lazy">
				</a>
				<p class="small muted">Part of the UCC’s <a class="link-underline strong ink" href="https://www.ucc.org/loveislouder" target="_blank" rel="noopener">Love Is Louder</a> movement: love your neighbor, out loud.</p>
			</div>
			<?php if ( $o['ona_statement_url'] ) : ?>
				<a class="text-link reveal" style="--i:4" href="<?php echo esc_url( $o['ona_statement_url'] ); ?>"><span class="link-underline">Read our full ONA statement</span> <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
			<?php endif; ?>
		</div>
	</div>
</section>

<section class="wrap section">
	<div class="section-head">
		<div class="reveal">
			<p class="eyebrow">What we’re about</p>
			<h2 class="display-lg">Four things we keep coming back to.</h2>
		</div>
		<div class="lede reveal" style="--i:1"><p>Each one comes straight from our mission statement.</p></div>
	</div>
	<div class="pillars">
		<?php foreach ( $pillars as $i => $p ) : ?>
			<div class="pillar reveal" style="--i:<?php echo (int) $i; ?>">
				<p class="pillar-n"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></p>
				<h3 class="display-md"><?php echo esc_html( $p[0] ); ?></h3>
				<p class="muted"><?php echo esc_html( $p[1] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
</section>

<section class="band band-deep">
	<div class="wrap firsts">
		<div class="reveal">
			<p class="eyebrow">The wider family</p>
			<h2 class="display-md">The United Church of Christ has a habit of going first.</h2>
		</div>
		<ul class="firsts-list">
			<?php foreach ( $firsts as $i => $f ) : ?>
				<li class="reveal" style="--i:<?php echo (int) $i; ?>"><p class="firsts-year"><?php echo esc_html( $f[0] ); ?></p><p class="muted"><?php echo esc_html( $f[1] ); ?></p></li>
			<?php endforeach; ?>
		</ul>
	</div>
</section>

<section class="wrap section" id="pastor">
	<div class="pastor">
		<div class="pastor-photo reveal">
			<div class="photo ratio-4-5"><img class="parallax" src="<?php echo esc_url( faith_pastor_photo_url() ); ?>" alt="<?php echo esc_attr( $o['pastor_name'] ); ?>" loading="lazy"></div>
		</div>
		<div>
			<p class="eyebrow reveal">Our <?php echo esc_html( strtolower( $o['pastor_role'] ) ); ?><?php echo $o['pastor_since'] ? ' · since ' . esc_html( $o['pastor_since'] ) : ''; ?></p>
			<h2 class="display-lg reveal" style="--i:1"><?php echo esc_html( $o['pastor_name'] ); ?></h2>
			<div class="prose muted reveal" style="--i:2"><?php echo faith_paragraphs( $o['pastor_bio'] ); // phpcs:ignore ?></div>
			<a class="btn btn-ghost reveal" style="--i:3" href="mailto:<?php echo esc_attr( $o['email'] ); ?>?subject=<?php echo rawurlencode( 'For ' . $o['pastor_name'] ); ?>">Reach out <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
		</div>
	</div>
</section>

<section class="section" id="history">
	<div class="wrap section-head">
		<div class="reveal">
			<p class="eyebrow">Our story</p>
			<h2 class="display-lg">Sixty years, one cross, a lot of casseroles.</h2>
		</div>
		<div class="lede reveal" style="--i:1"><p>Faith started in 1966 with 30 people and no building. Rev. Robert Shock, our first pastor, built the wooden cross that still hangs in the sanctuary. Here’s the rest. Filter it, or just scroll sideways.</p></div>
	</div>

	<div class="tl" data-timeline>
		<div class="wrap tl-controls">
			<div class="chips" role="group" aria-label="Filter the timeline">
				<?php foreach ( $filters as $key => $label ) : ?>
					<button type="button" class="chip<?php echo 'all' === $key ? ' is-on' : ''; ?>" data-filter="<?php echo esc_attr( $key ); ?>" aria-pressed="<?php echo 'all' === $key ? 'true' : 'false'; ?>"><?php echo esc_html( $label ); ?></button>
				<?php endforeach; ?>
			</div>
			<div class="tl-arrows">
				<button type="button" class="circle-btn circle-btn-lg" data-tl-prev aria-label="Scroll timeline back"><?php echo faith_icon( 'arrow-left' ); // phpcs:ignore ?></button>
				<button type="button" class="circle-btn circle-btn-lg" data-tl-next aria-label="Scroll timeline forward"><?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></button>
			</div>
		</div>
		<div class="tl-track" data-tl-track tabindex="0" aria-label="Church history, scroll sideways">
			<?php foreach ( $milestones as $m ) : ?>
				<?php $tag = get_post_meta( $m->ID, 'faith_tag', true ); ?>
				<article class="tl-card tag-<?php echo esc_attr( $tag ? $tag : 'home' ); ?>" data-tag="<?php echo esc_attr( $tag ? $tag : 'home' ); ?>">
					<p class="tl-year"><?php echo esc_html( get_post_meta( $m->ID, 'faith_year', true ) ); ?></p>
					<h3 class="tl-card-title"><?php echo esc_html( get_the_title( $m ) ); ?></h3>
					<p class="muted"><?php echo esc_html( get_post_meta( $m->ID, 'faith_blurb', true ) ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>
		<div class="wrap"><div class="tl-progress"><span data-tl-bar></span></div></div>
	</div>

	<div class="wrap tl-photo">
		<?php faith_figure( faith_img( 'building.webp' ), 'Faith United Church of Christ’s brick building and steeple on Loop 337', array( 'ratio' => 'panorama', 'caption' => 'Baese Fellowship Hall and the sanctuary on Loop 337.' ) ); ?>
	</div>
</section>

<?php
get_template_part(
	'parts/where-next',
	null,
	array(
		'links' => array(
			array( 'Your first Sunday', 'Times, kids, communion', faith_page_url( 'visit' ), 'childrens-sermon.webp' ),
			array( 'In the community', 'Where our faith goes on weekdays', faith_page_url( 'community' ), 'big-serve-build.webp' ),
			array( 'Give', 'Keep the doors open', faith_page_url( 'give' ), 'candles.webp' ),
		),
	)
);
get_footer();
