<?php
/**
 * Home page.
 */
get_header();
the_post();
$o        = faith_opts();
// The church's own "Be the Church" banner.
$values   = array( 'Protect the environment.', 'Care for the poor.', 'Forgive often.', 'Reject racism.', 'Fight for the powerless.', 'Share earthly and spiritual resources.', 'Embrace diversity.', 'Love God.', 'Enjoy this life.' );
$partners = get_posts( array( 'post_type' => 'faith_partner', 'posts_per_page' => 12, 'orderby' => 'menu_order', 'order' => 'ASC' ) );
?>

<section class="hero">
	<div class="wrap hero-grid">
		<div class="hero-copy">
			<p class="eyebrow fade-in" style="--d:.05s">New Braunfels, Texas · Since 1966</p>
			<?php faith_headline( faith_page_headline() ); ?>
			<div class="lede fade-in hero-lede" style="--d:.75s"><?php echo wp_kses_post( wpautop( get_the_content() ) ); ?></div>
			<div class="btn-row fade-in" style="--d:.95s">
				<a class="btn btn-primary" href="<?php echo esc_url( faith_page_url( 'visit' ) ); ?>">Plan your first Sunday <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
				<a class="btn btn-ghost" href="<?php echo esc_url( $o['zoom_url'] ); ?>" target="_blank" rel="noopener">Watch on Zoom</a>
			</div>
			<div class="fade-in hero-status" style="--d:1.1s"><?php get_template_part( 'parts/sunday-status' ); ?></div>
		</div>
		<div class="hero-media">
			<div class="hero-photo photo">
				<img src="<?php echo esc_url( faith_img( 'choir.webp' ) ); ?>" alt="Faith's sanctuary on a Sunday, with rainbow ribbons strung across the wooden rafters and the choir singing at the front" fetchpriority="high">
			</div>
			<p class="caption fade-in" style="--d:1.3s">Sunday morning in the sanctuary. The ribbons are ours.</p>
		</div>
	</div>
	<?php echo faith_ribbons( 'hero-ribbons', 0.7 ); // phpcs:ignore ?>
</section>

<div class="marquee-wrap">
	<p class="marquee-label">Be the<br>Church</p>
	<div class="marquee" aria-hidden="true">
		<div class="marquee-track">
			<?php foreach ( array_merge( $values, $values ) as $v ) : ?>
				<span class="marquee-item"><?php echo esc_html( $v ); ?><span class="marquee-dot"></span></span>
			<?php endforeach; ?>
		</div>
	</div>
	<p class="screen-reader-text">Be the Church: <?php echo esc_html( implode( ' ', $values ) ); ?></p>
</div>

<section class="wrap section">
	<div class="section-head">
		<div class="reveal">
			<p class="eyebrow">Not a slogan. A record.</p>
			<h2 class="display-lg">We were saying yes before it was easy.</h2>
		</div>
		<div class="lede reveal" style="--i:1">
			<p>Lots of churches say “all are welcome.” Here’s what it’s looked like at Faith: blessing same-sex couples in 2002, voting to become Open and Affirming in 2009, and cheering when two of our members became the first couple legally married in Comal County in 2015.</p>
			<a class="text-link" href="<?php echo esc_url( faith_page_url( 'about', 'history' ) ); ?>"><span class="link-underline">Read the whole story</span> <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
		</div>
	</div>
	<dl class="stats">
		<?php for ( $n = 1; $n <= 4; $n++ ) : ?>
			<?php if ( $o[ "stat{$n}_figure" ] ) : ?>
				<div class="stat reveal" style="--i:<?php echo (int) ( $n - 1 ); ?>">
					<dt><?php echo esc_html( $o[ "stat{$n}_figure" ] ); ?></dt>
					<dd><?php echo esc_html( $o[ "stat{$n}_label" ] ); ?></dd>
				</div>
			<?php endif; ?>
		<?php endfor; ?>
	</dl>
</section>

<section class="wrap section">
	<div class="spread">
		<?php faith_figure( faith_img( 'clergy.webp' ), 'Clergy in rainbow stoles gathered around the communion table with members of the congregation', array( 'ratio' => '5-4', 'caption' => 'Clergy and friends around the table.', 'class' => 'spread-main' ) ); ?>
		<div class="spread-side">
			<?php faith_figure( faith_img( 'childrens-sermon.webp' ), 'Children gathered at the front of the sanctuary for the children’s message', array( 'ratio' => '4-3', 'caption' => 'The children’s message.' ) ); ?>
			<blockquote class="mission reveal" style="--i:1">
				<p>“A welcoming community that seeks to embrace diversity, empower a spirit of service, explore the mysteries of God and life’s complexities while engaging as Christians in the work of justice for all creation.”</p>
				<cite>Our mission statement</cite>
			</blockquote>
		</div>
	</div>
</section>

<section class="wrap section">
	<div class="section-head">
		<div class="reveal">
			<p class="eyebrow">Start anywhere</p>
			<h2 class="display-lg">However you got here, there’s a way in.</h2>
		</div>
	</div>
	<div class="ways">
		<?php
		$ways = array(
			array( 'Thinking about visiting?', 'What Sunday’s like, what to wear, where the kids go.', faith_page_url( 'visit' ) ),
			array( 'Burned by church before?', 'What Open and Affirming means here, and what we believe.', faith_page_url( 'about' ) ),
			array( 'Want to do something?', 'Food bank shifts, literacy tutoring, housing families.', faith_page_url( 'community' ) ),
			array( 'Just want to meet people?', 'Theology on Tap, game night, book group.', faith_page_url( 'community', 'gatherings' ) ),
		);
		foreach ( $ways as $i => $w ) :
			?>
			<a class="way reveal" style="--i:<?php echo (int) $i; ?>" href="<?php echo esc_url( $w[2] ); ?>">
				<div>
					<p class="display-md way-title"><?php echo esc_html( $w[0] ); ?></p>
					<p class="muted"><?php echo esc_html( $w[1] ); ?></p>
				</div>
				<span class="circle-btn circle-btn-lg"><?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></span>
			</a>
		<?php endforeach; ?>
	</div>
</section>

<section class="band band-deep">
	<div class="wrap band-grid">
		<div class="reveal">
			<p class="eyebrow">Coming up</p>
			<h2 class="display-lg">Sunday is just the start.</h2>
			<p class="lede">Every week there’s worship, Sunday school, and book group. Every month there’s more.</p>
			<a class="btn btn-ghost" href="<?php echo esc_url( faith_page_url( 'community', 'gatherings' ) ); ?>">Everything we do <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
		</div>
		<?php get_template_part( 'parts/date-list', null, array( 'items' => faith_coming_up(), 'limit' => 4 ) ); ?>
	</div>
</section>

<section class="wrap section">
	<div class="split">
		<?php faith_figure( faith_img( 'big-serve-crowd.webp' ), 'A crowd of volunteers in matching shirts gathered inside a food bank warehouse', array( 'caption' => 'Volunteers at a Big Serve NB day.', 'class' => 'split-media' ) ); ?>
		<div>
			<p class="eyebrow reveal">Love is a verb</p>
			<h2 class="display-lg reveal" style="--i:1">Faith happens on Loop 337. It doesn’t stay there.</h2>
			<ul class="pills">
				<?php foreach ( $partners as $i => $p ) : ?>
					<li class="pill reveal" style="--i:<?php echo (int) ( $i + 2 ); ?>"><?php echo esc_html( get_the_title( $p ) ); ?></li>
				<?php endforeach; ?>
			</ul>
			<a class="btn btn-primary reveal" style="--i:3" href="<?php echo esc_url( faith_page_url( 'community' ) ); ?>">See what we’re part of <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
		</div>
	</div>
</section>

<?php
// Only show news on the home page while it's fresh; old posts live on the News page.
$latest = get_posts( array( 'post_type' => 'post', 'posts_per_page' => 3, 'ignore_sticky_posts' => true, 'date_query' => array( array( 'after' => '120 days ago' ) ) ) );
if ( $latest ) :
	?>
	<section class="wrap section">
		<div class="section-head">
			<div class="reveal">
				<p class="eyebrow">News &amp; notes</p>
				<h2 class="display-lg">From the church.</h2>
			</div>
			<div class="reveal self-end" style="--i:1">
				<a class="text-link" href="<?php echo esc_url( faith_page_url( 'news' ) ); ?>"><span class="link-underline">All news</span> <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
			</div>
		</div>
		<div class="post-grid">
			<?php
			foreach ( $latest as $i => $p ) {
				get_template_part( 'parts/post-card', null, array( 'post' => $p, 'i' => $i ) );
			}
			?>
		</div>
	</section>
<?php endif; ?>

<section class="wrap section">
	<div class="pastor-note">
		<?php faith_figure( faith_pastor_photo_url(), $o['pastor_name'], array( 'ratio' => '4-5' ) ); ?>
		<div class="reveal" style="--i:1">
			<p class="eyebrow">Our pastor</p>
			<p class="display-md pastor-short"><?php echo esc_html( $o['pastor_short'] ); ?></p>
			<a class="text-link" href="<?php echo esc_url( faith_page_url( 'about', 'pastor' ) ); ?>"><span class="link-underline">Meet <?php echo esc_html( $o['pastor_name'] ); ?></span> <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
		</div>
	</div>
</section>

<?php
get_footer();
