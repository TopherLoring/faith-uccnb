<?php
/**
 * First-run setup: creates the pages and fills in the verified starting content,
 * so the site works the moment the theme is activated. Runs once; never overwrites edits.
 * Switching to another theme restores the previous home page settings.
 */

add_action( 'after_switch_theme', 'faith_seed' );

add_action( 'switch_theme', function () {
	$prev = get_option( 'faith_prev_reading' );
	if ( is_array( $prev ) ) {
		update_option( 'show_on_front', $prev['show_on_front'] );
		update_option( 'page_on_front', $prev['page_on_front'] );
		update_option( 'page_for_posts', $prev['page_for_posts'] );
	}
} );

function faith_seed() {
	if ( ! get_option( 'faith_prev_reading' ) ) {
		update_option(
			'faith_prev_reading',
			array(
				'show_on_front'  => get_option( 'show_on_front' ),
				'page_on_front'  => (int) get_option( 'page_on_front' ),
				'page_for_posts' => (int) get_option( 'page_for_posts' ),
			),
			false
		);
	}

	$pages = faith_seed_pages();
	$ids   = array();
	foreach ( $pages as $slug => $p ) {
		$existing = get_page_by_path( $slug );
		if ( $existing ) {
			$ids[ $slug ] = $existing->ID;
			if ( ! get_post_meta( $existing->ID, 'faith_headline', true ) && ! empty( $p['headline'] ) ) {
				update_post_meta( $existing->ID, 'faith_headline', $p['headline'] );
			}
			continue;
		}
		$ids[ $slug ] = wp_insert_post(
			array(
				'post_type'    => 'page',
				'post_status'  => 'publish',
				'post_title'   => $p['title'],
				'post_name'    => $slug,
				'post_content' => $p['content'],
				'menu_order'   => $p['order'],
			)
		);
		if ( ! empty( $p['headline'] ) ) {
			update_post_meta( $ids[ $slug ], 'faith_headline', $p['headline'] );
		}
	}

	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $ids['home'] );
	update_option( 'page_for_posts', $ids['news'] );

	if ( ! get_option( 'faith_seeded_v1' ) ) {
		faith_seed_items();
		update_option( 'faith_seeded_v1', 1, false );
	}

	if ( ! get_option( 'faith_seeded_v2' ) ) {
		faith_seed_upgrade_v2();
		update_option( 'faith_seeded_v2', 1, false );
	}

	if ( false === get_option( 'faith_options', false ) ) {
		add_option( 'faith_options', faith_option_defaults() );
	}

	flush_rewrite_rules();
}

function faith_seed_pages() {
	return array(
		'home'      => array(
			'title'    => 'Home',
			'order'    => 0,
			'headline' => "Come as\nyou are.\n*Bring your*\n*{questions.|doubts.|family.|whole self.}*",
			'content'  => 'Faith is a progressive, Open and Affirming church on Loop 337. Every person, every family, every honest doubt has a seat here.',
		),
		'visit'     => array(
			'title'    => 'Plan a visit',
			'order'    => 1,
			'headline' => "Your first\n*Sunday.*",
			'content'  => 'Walking into a new church can be a lot. Here’s exactly what to expect, so the only surprise is how glad we are you came.',
		),
		'about'     => array(
			'title'    => 'Who we are',
			'order'    => 2,
			'headline' => "Progressive.\nAffirming.\n*Still asking.*",
			'content'  => 'Faith is a congregation of the United Church of Christ, the denomination behind “God is still speaking.” Questions are welcome here, doubt is part of faith, and nobody has to hide who they are to belong.',
		),
		'community' => array(
			'title'    => 'In the community',
			'order'    => 3,
			'headline' => "Love is\n*a verb.*",
			'content'  => 'Sunday is where we gather. The rest of the week is where it counts: feeding neighbors, teaching adults to read, housing families, and marching when it matters.',
		),
		'give'      => array(
			'title'    => 'Give',
			'order'    => 4,
			'headline' => "Keep the\n*doors open.*",
			'content'  => 'Faith runs on the generosity of the people who love it. In 2010, when the sanctuary note was called with 45 days’ notice, this congregation raised the money and burned the mortgage. That’s who we are.',
		),
		'news'      => array(
			'title'    => 'News',
			'order'    => 5,
			'headline' => "News &\n*notes.*",
			'content'  => '',
		),
	);
}

/**
 * Copy a bundled theme image into the media library and set it as a post's featured image.
 * Skips posts that already have one, so staff edits are never replaced.
 */
function faith_seed_attach_image( $post_id, $file, $alt ) {
	if ( ! $post_id || has_post_thumbnail( $post_id ) ) {
		return;
	}
	$path = get_template_directory() . '/assets/img/' . $file;
	if ( ! file_exists( $path ) ) {
		return;
	}
	$upload = wp_upload_bits( $file, null, file_get_contents( $path ) ); // phpcs:ignore
	if ( ! empty( $upload['error'] ) ) {
		return;
	}
	$type   = wp_check_filetype( $upload['file'] );
	$att_id = wp_insert_attachment(
		array(
			'post_mime_type' => $type['type'],
			'post_title'     => $alt,
			'post_status'    => 'inherit',
		),
		$upload['file'],
		$post_id
	);
	if ( is_wp_error( $att_id ) || ! $att_id ) {
		return;
	}
	require_once ABSPATH . 'wp-admin/includes/image.php';
	wp_update_attachment_metadata( $att_id, wp_generate_attachment_metadata( $att_id, $upload['file'] ) );
	update_post_meta( $att_id, '_wp_attachment_image_alt', $alt );
	set_post_thumbnail( $post_id, $att_id );
}

/**
 * Additions after the first release: gathering artwork and corrected partner links.
 * Only fills gaps and replaces the old SOS address; nothing staff changed is touched.
 */
function faith_seed_upgrade_v2() {
	$tot = get_posts( array( 'post_type' => 'faith_gathering', 'title' => 'Theology on Tap', 'posts_per_page' => 1, 'post_status' => 'any' ) );
	if ( $tot ) {
		faith_seed_attach_image( $tot[0]->ID, 'theology-on-tap.webp', 'Theology on Tap: glasses of beer on a slate table' );
	}
	// Seeded events: add any that are missing (and still ahead), then attach their flyers.
	foreach ( faith_seed_events() as $e ) {
		$found = get_posts( array( 'post_type' => 'faith_event', 'title' => $e['title'], 'posts_per_page' => 1, 'post_status' => 'any' ) );
		if ( $found ) {
			$id = $found[0]->ID;
		} elseif ( $e['date'] >= faith_today() ) {
			$id = wp_insert_post( array( 'post_type' => 'faith_event', 'post_status' => 'publish', 'post_title' => $e['title'], 'post_content' => $e['content'] ) );
			update_post_meta( $id, 'faith_date', $e['date'] );
			update_post_meta( $id, 'faith_start', $e['start'] );
			update_post_meta( $id, 'faith_end', $e['end'] );
			update_post_meta( $id, 'faith_location', $e['location'] );
		} else {
			continue;
		}
		if ( ! empty( $e['image'] ) ) {
			faith_seed_attach_image( $id, $e['image'], $e['alt'] );
		}
	}
	foreach ( get_posts( array( 'post_type' => 'faith_partner', 'posts_per_page' => 50, 'post_status' => 'any' ) ) as $p ) {
		$link = get_post_meta( $p->ID, 'faith_url', true );
		if ( $link && false !== strpos( $link, 'sosfoodbank.org' ) ) {
			update_post_meta( $p->ID, 'faith_url', 'https://sosnb.org' );
		}
	}
}

function faith_seed_items() {
	$order = 0;
	foreach ( faith_seed_gatherings() as $g ) {
		$id = wp_insert_post( array( 'post_type' => 'faith_gathering', 'post_status' => 'publish', 'post_title' => $g[0], 'menu_order' => $order++ ) );
		update_post_meta( $id, 'faith_rule', $g[1] );
		update_post_meta( $id, 'faith_weekday', (string) $g[2] );
		update_post_meta( $id, 'faith_start', $g[3] );
		update_post_meta( $id, 'faith_end', $g[4] );
		update_post_meta( $id, 'faith_blurb', $g[5] );
	}

	$order = 0;
	foreach ( faith_seed_milestones() as $m ) {
		$id = wp_insert_post( array( 'post_type' => 'faith_milestone', 'post_status' => 'publish', 'post_title' => $m[1], 'menu_order' => $order++ ) );
		update_post_meta( $id, 'faith_year', $m[0] );
		update_post_meta( $id, 'faith_blurb', $m[2] );
		update_post_meta( $id, 'faith_tag', $m[3] );
	}

	$order = 0;
	foreach ( faith_seed_partners() as $p ) {
		$id = wp_insert_post( array( 'post_type' => 'faith_partner', 'post_status' => 'publish', 'post_title' => $p[0], 'menu_order' => $order++ ) );
		update_post_meta( $id, 'faith_role', $p[1] );
		update_post_meta( $id, 'faith_since', $p[2] );
		update_post_meta( $id, 'faith_blurb', $p[3] );
		update_post_meta( $id, 'faith_url', $p[4] );
	}

	// Real upcoming events from the church's Facebook page. Skipped once their date has passed.
	foreach ( faith_seed_events() as $e ) {
		if ( $e['date'] < faith_today() ) {
			continue;
		}
		$id = wp_insert_post( array( 'post_type' => 'faith_event', 'post_status' => 'publish', 'post_title' => $e['title'], 'post_content' => $e['content'] ) );
		update_post_meta( $id, 'faith_date', $e['date'] );
		update_post_meta( $id, 'faith_start', $e['start'] );
		update_post_meta( $id, 'faith_end', $e['end'] );
		update_post_meta( $id, 'faith_location', $e['location'] );
	}

	$order = 0;
	foreach ( faith_seed_faqs() as $f ) {
		$id = wp_insert_post( array( 'post_type' => 'faith_faq', 'post_status' => 'publish', 'post_title' => $f[0], 'menu_order' => $order++ ) );
		update_post_meta( $id, 'faith_blurb', $f[1] );
	}
}

/** [title, rule, weekday, start, end, blurb] */
function faith_seed_gatherings() {
	return array(
		array( 'Sunday worship', 'weekly', 0, '10:00', '11:20', 'In the sanctuary and on Zoom. Music, scripture, a sermon, and a children’s message.' ),
		array( 'Sunday school', 'weekly', 0, '11:20', '12:20', 'For kids and families, right after worship.' ),
		array( 'Book discussion group', 'weekly', 0, '11:30', '12:30', 'Adults reading and talking together. Currently: Leslie Weatherhead’s The Will of God. Everyone welcome.' ),
		array( 'Communion', '1', 0, '', '', 'Shared during worship. The table is open to everyone, no membership or background required.' ),
		array( 'Youth & family social', '1', 0, '', '', 'Kids, parents, and whoever came with them, hanging out after church.' ),
		array( 'Theology on Tap', '3', 0, '', '', 'Open-minded conversation where every question is fair game. Bring the one you’re not supposed to ask.' ),
		array( 'Game night', 'last', 6, '', '', 'Board games, cards, snacks. All ages.' ),
	);
}

/** [year, headline, body, tag] */
function faith_seed_milestones() {
	return array(
		array( '1966', 'Thirty people and an idea', 'First Protestant UCC sponsors a second congregation in town. Faith is commissioned on September 4 with 21 adults and 9 children.', 'home' ),
		array( '1966–74', 'Church without a building', 'Worship moves between Eden Home, the Landa Professional Building, Comal Middle School, and Slumber Falls Camp.', 'home' ),
		array( '1974', 'The Baese family gives the land', 'Construction starts on the first building, today’s Baese Fellowship Hall.', 'home' ),
		array( '1975', 'First service on Loop 337', 'December 21, in a building that wasn’t finished yet.', 'home' ),
		array( '1976', 'The cross', 'Rev. Robert Shock, Faith’s first pastor, builds the wooden cross that still hangs in the sanctuary.', 'home' ),
		array( '1999', 'A new sanctuary', 'Ground broken in 1998; first worship on July 4, 1999. Art glass windows dedicated in 2001.', 'home' ),
		array( '2002', 'Blessing same-sex unions', 'Faith begins celebrating same-sex unions, more than a decade before Obergefell.', 'welcome' ),
		array( '2007', 'Lending with Kiva', 'Members start making microloans. The total is now over $63,000, to borrowers in 85 countries.', 'service' ),
		array( '2009', 'Open and Affirming', 'After discernment and a church-wide conversation, the congregation votes to become ONA.', 'welcome' ),
		array( '2010', 'Burning the note', 'The sanctuary mortgage is called with about 45 days’ notice. Elmo Fischer offers a 1:1 match, the congregation raises the rest, and the note is burned in February.', 'home' ),
		array( '2015', 'First in Comal County', 'Two Faith members become the first couple legally married in the county.', 'welcome' ),
		array( '2015', 'LEAP begins', 'Faith founds LEAP, free tutoring for adults who struggle to read.', 'service' ),
		array( '2021', 'Pride comes to New Braunfels', 'The city’s Pride festival begins, and Faith shows up for it.', 'welcome' ),
		array( '2021', 'Pastor Carla arrives', 'Rev. Dr. Carla Cheatham begins as pastor on January 1.', 'home' ),
	);
}

/** [name, role, since, body, url] */
function faith_seed_partners() {
	return array(
		array( 'SOS Food Bank', 'Feeding neighbors', '40+ years', 'Members serve at Spirit of Sharing, New Braunfels’ food bank. Faith has backed it for more than four decades.', 'https://sosnb.org' ),
		array( 'Family Promise', 'Housing families', 'Founding member', 'Faith helped start the local Family Promise network, which supports families experiencing homelessness.', 'https://fpgnb.org' ),
		array( 'LEAP', 'Adult literacy', 'Founded by Faith, 2015', 'Free one-on-one tutoring for adults who struggle to read. Started here, still running.', '' ),
		array( 'Kiva', 'Microlending', 'Since 2007', 'Over $63,000 lent to borrowers in underserved communities across 85 countries, repaid and lent again.', 'https://www.kiva.org' ),
		array( 'MLK New Braunfels', 'Racial justice', 'Since the first march', 'Faith has walked in the city’s MLK march since it began, and works with the MLK New Braunfels Association year-round.', 'https://nbmlk.com' ),
		array( 'Local Pride', 'Showing up', 'Since 2021', 'When New Braunfels Pride started, Faith was there. We support local Pride events every year.', '' ),
	);
}

/** [question, answer] */
function faith_seed_faqs() {
	return array(
		array( 'What should I wear?', 'There’s no dress code. Wear what you’re comfortable in.' ),
		array( 'Do I have to be a Christian? Or believe a certain thing?', 'No. Faith is a place to explore the mysteries of God and life’s complexities, not a place to sign off on a list. Doubters, seekers, and people healing from churches that hurt them are all here.' ),
		array( 'I’m LGBTQ+. Is this actually safe?', 'Yes, and not just on paper. We voted to become Open and Affirming in 2009, have blessed same-sex unions since 2002, and members of this church were the first couple legally married in Comal County. You’re welcome into full membership and participation, as yourself.' ),
		array( 'Can I take communion?', 'Yes. Communion is on the first Sunday of each month and the table is open to everyone. No membership, baptism, or background required.' ),
		array( 'What about my kids?', 'Kids are welcome in worship. There’s a children’s message during the service, Sunday school from 11:20 to 12:20, and a youth and family social on first Sundays.' ),
		array( 'Can I just watch first?', 'Absolutely. Worship is live on Zoom every Sunday. No sign-up, and you can keep your camera off.' ),
		array( 'Accessibility questions?', 'Call the church office or send us an email, and we’ll make sure you have what you need before you arrive.' ),
	);
}

function faith_seed_events() {
	return array(
		array(
			'title'    => 'Ecumenical Thanksgiving Worship',
			'date'     => '2026-11-19',
			'start'    => '18:30',
			'end'      => '19:15',
			'location' => 'Peace Lutheran Church, 1147 S. Walnut Ave.',
			'content'  => '<p>Together we give thanks. Join our local faith community as we gather to glorify God and give thanks with our brothers and sisters in Christ.</p><p>Partner congregations: Peace Lutheran Church, St. John’s Episcopal Church, New Braunfels Presbyterian Church, Faith United Church of Christ, and others.</p><p>The offering supports First Footing Shelter of New Braunfels. Fellowship and refreshments follow.</p>',
			'image'    => 'thanksgiving-2026-flyer.webp',
			'alt'      => 'Flyer: Ecumenical Thanksgiving Worship, Thursday, November 19, 2026, 6:30 to 7:15 p.m. at Peace Lutheran Church, 1147 S. Walnut Ave., New Braunfels. Offering for First Footing Shelter; fellowship and refreshments to follow.',
		),
		array(
			'title'    => 'Soup Swap & Game Night',
			'date'     => '2026-12-12',
			'start'    => '18:00',
			'end'      => '21:00',
			'location' => 'Fellowship Hall',
			'content'  => '<p>Come share warm soups and warmer friendships! Bring a favorite soup, bread or dessert to share, along with your beverage of choice.</p><p>We’ll have board games ready to play, plus a fire pit (weather permitting).</p>',
			'image'    => 'soup-swap-flyer.webp',
			'alt'      => 'Flyer: Faith UCC Soup Swap and Game Night, December 12, 6 to 9 p.m. in the Fellowship Hall. Bring a soup, bread or dessert to share; board games and a fire pit.',
		),
	);
}
