<?php
/**
 * Rent our space: the sanctuary and the Fellowship Hall. Prices and contact come from Church Info.
 */
get_header();
the_post();
$o     = faith_opts();
$phone = $o['rent_phone'] ? $o['rent_phone'] : $o['phone'];
$email = $o['rent_email'] ? $o['rent_email'] : $o['email'];
$mail  = 'mailto:' . $email . '?subject=' . rawurlencode( 'Renting space at Faith UCC' );

get_template_part(
	'parts/page-intro',
	null,
	array(
		'eyebrow' => 'Rent our space',
		'after'   => function () use ( $o, $phone, $email, $mail ) {
			?>
			<div class="btn-row fade-in" style="--d:.85s">
				<a class="btn btn-primary" href="<?php echo esc_url( $o['rent_phone_href'] ); ?>">Call <?php echo esc_html( $phone ); ?></a>
				<a class="btn btn-ghost" href="<?php echo esc_url( $mail ); ?>"><?php echo faith_icon( 'mail' ); // phpcs:ignore ?> Email the office</a>
			</div>
			<?php
		},
	)
);

$spaces = array(
	array(
		'id'       => 'sanctuary',
		'name'     => 'The sanctuary',
		'note'     => 'Newly remodeled, with the rainbow ribbons overhead and the stained glass up front.',
		'img'      => 'rent-sanctuary.webp',
		'alt'      => 'The remodeled sanctuary: rows of blue chairs, a wooden center aisle, exposed roof beams and rainbow ribbons',
		'prices'   => array(
			array( 'Sanctuary only', $o['rent_sanctuary'] ),
			array( 'Sanctuary & Fellowship Hall', $o['rent_both'] ),
		),
		'includes' => '',
	),
	array(
		'id'       => 'fellowship-hall',
		'name'     => 'Fellowship Hall',
		'note'     => 'An open room with a small stage, steps from the shaded yard and playground.',
		'img'      => 'rent-hall.webp',
		'alt'      => 'The Fellowship Hall: a large open room with a light floor, pendant lights and a low red stage',
		'prices'   => array(
			array( 'By the day', $o['rent_hall_day'] ),
			array( 'By the hour', $o['rent_hall_hour'] ),
		),
		'includes' => 'Includes the kitchen and bathrooms.',
	),
);
?>

<section class="wrap">
	<div class="spaces">
		<?php foreach ( $spaces as $i => $sp ) : ?>
			<?php $prices = array_filter( $sp['prices'], fn( $p ) => '' !== trim( (string) $p[1] ) ); ?>
			<article class="space reveal" id="<?php echo esc_attr( $sp['id'] ); ?>" style="--i:<?php echo (int) $i; ?>">
				<div class="photo ratio-4-3"><img src="<?php echo esc_url( faith_img( $sp['img'] ) ); ?>" alt="<?php echo esc_attr( $sp['alt'] ); ?>" loading="lazy" decoding="async"></div>
				<div class="space-body">
					<h2 class="display-md"><?php echo esc_html( $sp['name'] ); ?></h2>
					<p class="muted space-note"><?php echo esc_html( $sp['note'] ); ?></p>
					<?php if ( $prices ) : ?>
						<dl class="price-list">
							<?php foreach ( $prices as $p ) : ?>
								<div class="price-row"><dt><?php echo esc_html( $p[0] ); ?></dt><dd><?php echo esc_html( $p[1] ); ?></dd></div>
							<?php endforeach; ?>
						</dl>
					<?php endif; ?>
					<?php if ( $sp['includes'] ) : ?><p class="small space-includes"><?php echo esc_html( $sp['includes'] ); ?></p><?php endif; ?>
				</div>
			</article>
		<?php endforeach; ?>
	</div>
	<?php if ( $o['rent_deposit'] || $o['rent_note'] ) : ?>
		<div class="rent-notes reveal">
			<?php if ( $o['rent_deposit'] ) : ?><p><span class="strong ink">Deposit:</span> <?php echo esc_html( $o['rent_deposit'] ); ?></p><?php endif; ?>
			<?php if ( $o['rent_note'] ) : ?><p><?php echo esc_html( $o['rent_note'] ); ?></p><?php endif; ?>
		</div>
	<?php endif; ?>
</section>

<section class="wrap section">
	<div class="section-head">
		<div class="reveal">
			<p class="eyebrow">The grounds</p>
			<h2 class="display-lg">On Loop 337, with room to park.</h2>
		</div>
		<div class="lede reveal" style="--i:1">
			<p>The sanctuary and the Fellowship Hall sit side by side on one lot, with the parking lot out front and a shaded yard and playground by the hall.</p>
		</div>
	</div>
	<div class="rent-gallery">
		<?php faith_figure( faith_img( 'rent-exterior.webp' ), 'The church from the parking lot: a brick sanctuary with a steeple and a metal roof, the Fellowship Hall beside it', array( 'ratio' => '4-3', 'caption' => 'The sanctuary and the Fellowship Hall from the parking lot.' ) ); ?>
		<?php faith_figure( faith_img( 'rent-hall-exterior.webp' ), 'The Fellowship Hall from outside: a long brick building with a covered entry', array( 'ratio' => '4-3', 'caption' => 'The Fellowship Hall entrance.', 'i' => 1 ) ); ?>
		<?php faith_figure( faith_img( 'rent-yard.webp' ), 'The yard behind the hall: a large oak tree shading a picnic table and a playground', array( 'ratio' => '4-3', 'caption' => 'The yard and playground under the oak.', 'i' => 2 ) ); ?>
	</div>
</section>

<section class="wrap section">
	<div class="callout reveal">
		<div>
			<p class="eyebrow">Check a date</p>
			<p class="display-md">Tell us the date, the time, and which space you need.</p>
		</div>
		<div class="btn-row callout-actions">
			<a class="btn btn-primary" href="<?php echo esc_url( $o['rent_phone_href'] ); ?>">Call <?php echo esc_html( $phone ); ?></a>
			<a class="btn btn-ghost" href="<?php echo esc_url( $mail ); ?>"><span class="break"><?php echo esc_html( $email ); ?></span></a>
		</div>
	</div>
</section>

<?php
get_template_part(
	'parts/where-next',
	null,
	array(
		'links' => array(
			array( 'Your first Sunday', 'What a Sunday here is like', faith_page_url( 'visit' ), 'choir.webp' ),
			array( 'Who we are', 'Progressive, Open and Affirming, UCC', faith_page_url( 'about' ), 'clergy.webp' ),
			array( 'Our story', 'From 30 people in 1966 to now', faith_page_url( 'about', 'history' ), 'building.webp' ),
		),
	)
);
get_footer();
