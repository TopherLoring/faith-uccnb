<?php
/**
 * Give.
 */
get_header();
the_post();
$o = faith_opts();

get_template_part(
	'parts/page-intro',
	null,
	array(
		'eyebrow' => 'Give',
		'after'   => function () use ( $o ) {
			?>
			<div class="btn-row fade-in" style="--d:.85s">
				<?php if ( $o['give_url'] ) : ?><a class="btn btn-primary" href="<?php echo esc_url( $o['give_url'] ); ?>" target="_blank" rel="noopener">Give online <?php echo faith_icon( 'arrow-up-right' ); // phpcs:ignore ?></a><?php endif; ?>
				<?php if ( $o['pledge_url'] ) : ?><a class="btn btn-ghost" href="<?php echo esc_url( $o['pledge_url'] ); ?>" target="_blank" rel="noopener">Make a pledge</a><?php endif; ?>
			</div>
			<p class="small muted fade-in" style="--d:1s">Online gifts are handled securely by Realm, our church management platform.</p>
			<?php
		},
	)
);
$where = array(
	array( 'An open door on Sundays', 'The sanctuary, the lights, and the Zoom stream for everyone who can’t be in the room.' ),
	array( 'Neighbors in need', 'Our work with SOS Food Bank, Family Promise, LEAP, Kiva, and MLK New Braunfels.' ),
	array( 'A pastor who shows up', 'Pastoral care for weddings, funerals, hospital rooms, and the hard conversations in between.' ),
);
?>

<section class="wrap">
	<div class="section-head">
		<div class="reveal">
			<p class="eyebrow">Where it goes</p>
			<h2 class="display-lg">What your gift does.</h2>
		</div>
	</div>
	<div class="where-it-goes">
		<?php foreach ( $where as $i => $w ) : ?>
			<div class="wig reveal" style="--i:<?php echo (int) $i; ?>">
				<p class="wig-n"><?php echo esc_html( str_pad( (string) ( $i + 1 ), 2, '0', STR_PAD_LEFT ) ); ?></p>
				<h3><?php echo esc_html( $w[0] ); ?></h3>
				<p class="muted"><?php echo esc_html( $w[1] ); ?></p>
			</div>
		<?php endforeach; ?>
	</div>
</section>

<section class="wrap section">
	<div class="split">
		<?php faith_figure( faith_img( 'clergy.webp' ), 'Clergy in rainbow stoles gathered around the communion table', array( 'ratio' => '5-4' ) ); ?>
		<div class="reveal" style="--i:1">
			<p class="eyebrow">Other ways to give</p>
			<ul class="ways-list">
				<li><p class="ways-title">In person on Sunday</p><p class="muted">The offering is part of worship every week.</p></li>
				<li><p class="ways-title">Bring food for SOS</p><p class="muted">Shelf-stable groceries go straight to neighbors through the Spirit of Sharing food bank.</p></li>
				<li><p class="ways-title">Give your time</p><p class="muted">Tutor with LEAP, host with Family Promise, or ask what’s needed: <a class="link-underline strong ink" href="mailto:<?php echo esc_attr( $o['email'] ); ?>?subject=Volunteering">email the office</a>.</p></li>
			</ul>
		</div>
	</div>
</section>

<?php
get_template_part(
	'parts/where-next',
	null,
	array(
		'links' => array(
			array( 'In the community', 'See the work you fund', faith_page_url( 'community' ), 'big-serve-crowd.webp' ),
			array( 'Our story', 'Including the mortgage burning', faith_page_url( 'about', 'history' ), 'building.webp' ),
			array( 'Your first Sunday', 'Come see for yourself', faith_page_url( 'visit' ), 'choir.webp' ),
		),
	)
);
get_footer();
