<?php
/**
 * Content types with plain, labelled forms (no page builder, no block editor).
 */

/**
 * Field definitions per post type: key => [label, type, help, options].
 * Types: text, textarea, date, time, url, select, number.
 */
function faith_meta_fields() {
	$weekdays = array( 0 => 'Sunday', 1 => 'Monday', 2 => 'Tuesday', 3 => 'Wednesday', 4 => 'Thursday', 5 => 'Friday', 6 => 'Saturday' );
	return array(
		'faith_event'     => array(
			'faith_date'     => array( 'Date', 'date', '', array() ),
			'faith_start'    => array( 'Starts', 'time', '', array() ),
			'faith_end'      => array( 'Ends (optional)', 'time', '', array() ),
			'faith_location' => array( 'Where', 'text', 'Example: Fellowship Hall, or a restaurant name.', array() ),
			'faith_link'     => array( 'Link (optional)', 'url', 'A sign-up form, Zoom link, or Facebook event.', array() ),
		),
		'faith_gathering' => array(
			'faith_rule'    => array(
				'How often',
				'select',
				'',
				array(
					'weekly' => 'Every week',
					'1'      => 'First of the month',
					'2'      => 'Second of the month',
					'3'      => 'Third of the month',
					'4'      => 'Fourth of the month',
					'last'   => 'Last of the month',
				),
			),
			'faith_weekday' => array( 'Day', 'select', '', $weekdays ),
			'faith_start'   => array( 'Starts (optional)', 'time', '', array() ),
			'faith_end'     => array( 'Ends (optional)', 'time', '', array() ),
			'faith_blurb'   => array( 'Short description', 'textarea', 'One or two sentences.', array() ),
		),
		'faith_milestone' => array(
			'faith_year'  => array( 'Year', 'text', 'Example: 1999, or 1966–74', array() ),
			'faith_tag'   => array(
				'Theme',
				'select',
				'Used by the filter buttons on the timeline.',
				array(
					'home'    => 'Our home',
					'welcome' => 'Welcome',
					'service' => 'Service',
				),
			),
			'faith_blurb' => array( 'What happened', 'textarea', '', array() ),
		),
		'faith_partner'   => array(
			'faith_role'  => array( 'What it is', 'text', 'Two or three words. Example: Adult literacy', array() ),
			'faith_since' => array( 'How long', 'text', 'Example: Since 2007, or Founding member', array() ),
			'faith_url'   => array( 'Website (optional)', 'url', '', array() ),
			'faith_blurb' => array( 'Description', 'textarea', '', array() ),
		),
		'faith_faq'       => array(
			'faith_blurb' => array( 'Answer', 'textarea', 'The question goes in the title box above.', array() ),
		),
		'page'            => array(
			'faith_headline' => array( 'Big headline', 'textarea', 'One line per row. Put *asterisks* around words to show them in the accent color. Leave blank to use the page title.', array() ),
		),
	);
}

add_action( 'init', function () {
	$common = array(
		'show_ui'      => true,
		'show_in_rest' => false,
		'map_meta_cap' => true,
		'capability_type' => 'page',
	);

	register_post_type(
		'faith_event',
		array_merge(
			$common,
			array(
				'labels'        => faith_cpt_labels( 'Event', 'Events', 'Add an event' ),
				'public'        => true,
				'has_archive'   => 'events',
				'rewrite'       => array( 'slug' => 'events', 'with_front' => false ),
				'menu_icon'     => 'dashicons-calendar-alt',
				'menu_position' => 4,
				'supports'      => array( 'title', 'editor', 'thumbnail' ),
			)
		)
	);

	register_post_type(
		'faith_gathering',
		array_merge(
			$common,
			array(
				'labels'        => faith_cpt_labels( 'Regular gathering', 'Regular gatherings', 'Add a regular gathering' ),
				'public'        => false,
				'menu_icon'     => 'dashicons-update',
				'menu_position' => 5,
				'supports'      => array( 'title', 'thumbnail', 'page-attributes' ),
			)
		)
	);

	register_post_type(
		'faith_milestone',
		array_merge(
			$common,
			array(
				'labels'        => faith_cpt_labels( 'History moment', 'Church history', 'Add a history moment' ),
				'public'        => false,
				'menu_icon'     => 'dashicons-backup',
				'menu_position' => 6,
				'supports'      => array( 'title', 'page-attributes' ),
			)
		)
	);

	register_post_type(
		'faith_partner',
		array_merge(
			$common,
			array(
				'labels'        => faith_cpt_labels( 'Partner', 'Community partners', 'Add a partner' ),
				'public'        => false,
				'menu_icon'     => 'dashicons-groups',
				'menu_position' => 7,
				'supports'      => array( 'title', 'thumbnail', 'page-attributes' ),
			)
		)
	);

	register_post_type(
		'faith_faq',
		array_merge(
			$common,
			array(
				'labels'        => faith_cpt_labels( 'Question', 'Visitor FAQs', 'Add a question' ),
				'public'        => false,
				'menu_icon'     => 'dashicons-editor-help',
				'menu_position' => 8,
				'supports'      => array( 'title', 'page-attributes' ),
			)
		)
	);

	foreach ( faith_meta_fields() as $type => $fields ) {
		foreach ( $fields as $key => $def ) {
			register_post_meta(
				$type,
				$key,
				array(
					'single'        => true,
					'type'          => 'string',
					'show_in_rest'  => false,
					'auth_callback' => fn() => current_user_can( 'edit_pages' ),
				)
			);
		}
	}
} );

function faith_cpt_labels( $one, $many, $add ) {
	return array(
		'name'               => $many,
		'singular_name'      => $one,
		'add_new'            => $add,
		'add_new_item'       => $add,
		'edit_item'          => 'Edit ' . strtolower( $one ),
		'new_item'           => 'New ' . strtolower( $one ),
		'view_item'          => 'View ' . strtolower( $one ),
		'search_items'       => 'Search ' . strtolower( $many ),
		'not_found'          => 'None yet.',
		'not_found_in_trash' => 'None in the trash.',
		'all_items'          => 'All ' . strtolower( $many ),
		'menu_name'          => $many,
		'featured_image'        => 'Flyer or photo',
		'set_featured_image'    => 'Add a flyer or photo',
		'remove_featured_image' => 'Remove flyer or photo',
		'use_featured_image'    => 'Use as flyer or photo',
	);
}

// Keep the custom types on the simple classic screen.
add_filter( 'use_block_editor_for_post_type', function ( $use, $type ) {
	return in_array( $type, array( 'faith_event', 'faith_gathering', 'faith_milestone', 'faith_partner', 'faith_faq' ), true ) ? false : $use;
}, 10, 2 );

// Friendlier placeholder in the title box.
add_filter( 'enter_title_here', function ( $text, $post ) {
	$map = array(
		'faith_event'     => 'Event name',
		'faith_gathering' => 'Gathering name, e.g. Theology on Tap',
		'faith_milestone' => 'Short headline, e.g. A new sanctuary',
		'faith_partner'   => 'Organization name',
		'faith_faq'       => 'The question, e.g. What should I wear?',
	);
	return isset( $map[ $post->post_type ] ) ? $map[ $post->post_type ] : $text;
}, 10, 2 );

add_action( 'add_meta_boxes', function () {
	$titles = array(
		'faith_event'     => 'When & where',
		'faith_gathering' => 'Schedule',
		'faith_milestone' => 'Details',
		'faith_partner'   => 'Details',
		'faith_faq'       => 'Answer',
		'page'            => 'Page headline',
	);
	foreach ( faith_meta_fields() as $type => $fields ) {
		add_meta_box( 'faith_meta', $titles[ $type ], 'faith_render_meta_box', $type, 'page' === $type ? 'side' : 'faith_after_title', 'high' );
	}
} );

// Show the date/time boxes right under the title, before the description editor.
add_action( 'edit_form_after_title', function ( $post ) {
	do_meta_boxes( get_current_screen(), 'faith_after_title', $post );
} );

function faith_render_meta_box( $post ) {
	$fields = faith_meta_fields()[ $post->post_type ] ?? array();
	wp_nonce_field( 'faith_meta_save', 'faith_meta_nonce' );
	echo '<div class="faith-meta">';
	foreach ( $fields as $key => $def ) {
		list( $label, $type, $help, $options ) = $def;
		$val = get_post_meta( $post->ID, $key, true );
		$id  = esc_attr( $key );
		echo '<p class="faith-meta-row"><label for="' . $id . '"><strong>' . esc_html( $label ) . '</strong></label><br>';
		switch ( $type ) {
			case 'textarea':
				echo '<textarea id="' . $id . '" name="' . $id . '" rows="' . ( 'page' === $post->post_type ? 4 : 5 ) . '" class="widefat">' . esc_textarea( $val ) . '</textarea>';
				break;
			case 'select':
				echo '<select id="' . $id . '" name="' . $id . '">';
				foreach ( $options as $ov => $ol ) {
					echo '<option value="' . esc_attr( (string) $ov ) . '"' . selected( (string) $val, (string) $ov, false ) . '>' . esc_html( $ol ) . '</option>';
				}
				echo '</select>';
				break;
			default:
				$class = in_array( $type, array( 'text', 'url' ), true ) ? 'widefat' : '';
				echo '<input type="' . esc_attr( $type ) . '" id="' . $id . '" name="' . $id . '" value="' . esc_attr( $val ) . '" class="' . $class . '">';
		}
		if ( $help ) {
			echo '<br><span class="description">' . esc_html( $help ) . '</span>';
		}
		echo '</p>';
	}
	echo '</div>';
}

add_action( 'save_post', function ( $post_id, $post ) {
	if ( ! isset( $_POST['faith_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['faith_meta_nonce'] ) ), 'faith_meta_save' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}
	$fields = faith_meta_fields()[ $post->post_type ] ?? array();
	foreach ( $fields as $key => $def ) {
		if ( ! isset( $_POST[ $key ] ) ) {
			continue;
		}
		$raw = wp_unslash( $_POST[ $key ] ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		switch ( $def[1] ) {
			case 'textarea':
				$val = sanitize_textarea_field( $raw );
				break;
			case 'url':
				$val = esc_url_raw( trim( $raw ) );
				break;
			case 'date':
				$val = preg_match( '/^\d{4}-\d{2}-\d{2}$/', $raw ) ? $raw : '';
				break;
			case 'time':
				$val = preg_match( '/^\d{1,2}:\d{2}$/', $raw ) ? $raw : '';
				break;
			case 'select':
				$val = array_key_exists( $raw, $def[3] ) ? (string) $raw : '';
				break;
			default:
				$val = sanitize_text_field( $raw );
		}
		update_post_meta( $post_id, $key, $val );
	}
}, 10, 2 );

/* ---------- Admin list columns ---------- */

add_filter( 'manage_faith_event_posts_columns', function ( $cols ) {
	return array(
		'cb'          => $cols['cb'],
		'title'       => 'Event',
		'faith_when'  => 'When',
		'faith_where' => 'Where',
	);
} );
add_action( 'manage_faith_event_posts_custom_column', function ( $col, $id ) {
	if ( 'faith_when' === $col ) {
		$d = get_post_meta( $id, 'faith_date', true );
		if ( $d ) {
			$past = $d < faith_today();
			echo '<span style="' . ( $past ? 'color:#999' : '' ) . '">' . esc_html( wp_date( 'D, M j, Y', strtotime( $d . ' 12:00' ) ) );
			$t = faith_time_range( get_post_meta( $id, 'faith_start', true ), get_post_meta( $id, 'faith_end', true ) );
			echo $t ? ' · ' . esc_html( $t ) : '';
			echo $past ? ' (past)' : '';
			echo '</span>';
		}
	}
	if ( 'faith_where' === $col ) {
		echo esc_html( get_post_meta( $id, 'faith_location', true ) );
	}
}, 10, 2 );
add_filter( 'manage_edit-faith_event_sortable_columns', fn( $c ) => array_merge( $c, array( 'faith_when' => 'faith_when' ) ) );
add_action( 'pre_get_posts', function ( WP_Query $q ) {
	if ( ! is_admin() || ! $q->is_main_query() || 'faith_event' !== $q->get( 'post_type' ) ) {
		return;
	}
	if ( ! $q->get( 'orderby' ) || 'faith_when' === $q->get( 'orderby' ) ) {
		$q->set( 'meta_key', 'faith_date' );
		$q->set( 'orderby', 'meta_value' );
		if ( ! $q->get( 'order' ) ) {
			$q->set( 'order', 'DESC' );
		}
	}
} );

add_filter( 'manage_faith_gathering_posts_columns', fn( $c ) => array( 'cb' => $c['cb'], 'title' => 'Gathering', 'faith_sched' => 'When' ) );
add_action( 'manage_faith_gathering_posts_custom_column', function ( $col, $id ) {
	if ( 'faith_sched' === $col ) {
		$g = faith_gathering_data( get_post( $id ) );
		echo esc_html( $g['when'] . ( $g['time'] ? ' · ' . $g['time'] : '' ) );
	}
}, 10, 2 );

add_filter( 'manage_faith_milestone_posts_columns', fn( $c ) => array( 'cb' => $c['cb'], 'faith_year' => 'Year', 'title' => 'Headline' ) );
add_action( 'manage_faith_milestone_posts_custom_column', function ( $col, $id ) {
	if ( 'faith_year' === $col ) {
		echo esc_html( get_post_meta( $id, 'faith_year', true ) );
	}
}, 10, 2 );

/* ---------- Posts become "News" in the admin ---------- */

add_action( 'init', function () {
	$labels                = get_post_type_object( 'post' )->labels;
	$labels->name          = 'News';
	$labels->singular_name = 'News post';
	$labels->add_new       = 'Write a news post';
	$labels->add_new_item  = 'Write a news post';
	$labels->all_items     = 'All news';
	$labels->menu_name     = 'News';
	$labels->name_admin_bar = 'News post';
}, 20 );
