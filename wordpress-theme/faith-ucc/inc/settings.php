<?php
/**
 * "Church Info" settings: one page of plain labelled boxes for everything that changes now and then.
 */

function faith_option_defaults() {
	return array(
		// Sunday.
		'worship_start'          => '10:00',
		'worship_end'            => '11:20',
		'zoom_url'               => 'https://us04web.zoom.us/j/586745671?pwd=aG0wUnZTR3NIKzBXUXp1Vkh2KzJXQT09',
		'zoom_id'                => '586 745 671',
		'communion_first_sunday' => 1,
		// Watch.
		'latest_video_url'       => '',
		'latest_video_title'     => '',
		'videos_url'             => 'https://www.facebook.com/FaithUCCNewBraunfels/videos/',
		// Newsletter.
		'newsletter_form_id'     => '711',
		'newsletter_url'         => 'https://www.faithuccnb.org/newsletters/',
		// Renting the building.
		'rent_sanctuary'         => '$500 per day',
		'rent_both'              => '$600 per day',
		'rent_hall_day'          => '$300 per day',
		'rent_hall_hour'         => '$75 per hour',
		'rent_deposit'           => '$100, refundable',
		'rent_phone'             => '(830) 625-6761',
		'rent_email'             => 'officemanager@faithuccnb.org',
		'rent_note'              => '',
		// Announcement bar.
		'announcement_text'      => '',
		'announcement_link'      => '',
		// Contact.
		'street'                 => '970 Loop 337',
		'city'                   => 'New Braunfels',
		'state'                  => 'TX',
		'zip'                    => '78130',
		'phone'                  => '(830) 625-6761',
		'email'                  => 'faithuccinfo@faithuccnb.org',
		// Giving.
		'give_url'               => 'https://onrealm.org/FaithUnitedChur/give/now',
		'pledge_url'             => 'https://www.faithuccnb.org/2022pledge/',
		// Links.
		'facebook_url'           => 'https://www.facebook.com/FaithUCCNewBraunfels',
		'instagram_url'          => 'https://www.instagram.com/faithuccnb/',
		'youtube_url'            => 'https://www.youtube.com/channel/UCIKKrs7USApGyOWURnIt_GA',
		'tiktok_url'             => 'https://www.tiktok.com/@faith.ucc0',
		'twitter_url'            => 'https://twitter.com/FaithUCCNB',
		'photos_url'             => 'http://photos.faithuccnb.org',
		'directory_url'          => 'https://www.faithuccnb.org/church-directory/',
		'ona_statement_url'      => 'https://www.faithuccnb.org/ona-statement/',
		// Pastor.
		'pastor_name'            => 'Rev. Dr. Carla Cheatham',
		'pastor_role'            => 'Pastor',
		'pastor_since'           => 'January 1, 2021',
		'pastor_photo'           => 0,
		'pastor_short'           => 'Rev. Dr. Carla Cheatham spent a decade as a hospice chaplain and grief counselor before becoming Faith’s pastor in 2021.',
		'pastor_bio'             => "Carla started out in social services, with an M.A. in psychology, certification in trauma therapy, and years in counseling and treatment centers. She went on to earn a Ph.D. in Health & Kinesiology and an M.Div.\n\nBefore Faith, she directed an interfaith nonprofit supporting worker justice, then spent a decade as a hospice chaplain and bereavement coordinator in Austin. She is the author of Hospice Whispers: Stories of Life and its companion grief workbook, and still teaches nationally on grief, compassion fatigue, and healthy boundaries.",
		// Home page numbers.
		'stat1_figure'           => '1966',
		'stat1_label'            => 'Founded by 21 adults and 9 kids',
		'stat2_figure'           => '2002',
		'stat2_label'            => 'First same-sex union blessed here',
		'stat3_figure'           => '40+ yrs',
		'stat3_label'            => 'Serving with the SOS Food Bank',
		'stat4_figure'           => '$63K+',
		'stat4_label'            => 'Lent through Kiva, in 85 countries',
		// Search engines.
		'meta_description'       => 'A progressive, Open and Affirming church on Loop 337 in New Braunfels, Texas. Sunday worship at 10 a.m., in person and on Zoom. Come as you are.',
	);
}

/** All options merged over defaults (cached per request). */
function faith_opts() {
	static $cache = null;
	if ( null === $cache ) {
		$saved = get_option( 'faith_options', array() );
		$cache = wp_parse_args( is_array( $saved ) ? $saved : array(), faith_option_defaults() );
		$cache['address_line'] = trim( $cache['street'] . ', ' . $cache['city'] . ', ' . $cache['state'] . ' ' . $cache['zip'] );
		$q                     = rawurlencode( get_bloginfo( 'name' ) . ' ' . $cache['address_line'] );
		$cache['maps_url']     = 'https://www.google.com/maps/search/?api=1&query=' . $q;
		$cache['maps_embed']   = 'https://maps.google.com/maps?q=' . rawurlencode( $cache['address_line'] ) . '&z=15&output=embed';
		$cache['phone_href']   = 'tel:+1' . preg_replace( '/\D/', '', $cache['phone'] );
		$cache['rent_phone_href'] = 'tel:+1' . preg_replace( '/\D/', '', $cache['rent_phone'] ? $cache['rent_phone'] : $cache['phone'] );
	}
	return $cache;
}

function faith_opt( $key ) {
	$o = faith_opts();
	return isset( $o[ $key ] ) ? $o[ $key ] : '';
}

function faith_pastor_photo_url() {
	$id = (int) faith_opt( 'pastor_photo' );
	if ( $id ) {
		$url = wp_get_attachment_image_url( $id, 'large' );
		if ( $url ) {
			return $url;
		}
	}
	return faith_img( 'pastor-carla.webp' );
}

/** Field definitions drive both the form and sanitizing. */
function faith_option_fields() {
	return array(
		'sunday'  => array(
			'title'  => 'Sunday worship',
			'help'   => 'Used across the site, including the live “Worship is on now” notice and the Zoom buttons.',
			'fields' => array(
				'worship_start'          => array( 'Worship starts', 'time' ),
				'worship_end'            => array( 'Worship ends', 'time' ),
				'zoom_url'               => array( 'Zoom link', 'url', 'Paste the full link people click to join.' ),
				'zoom_id'                => array( 'Zoom meeting ID', 'text' ),
				'communion_first_sunday' => array( 'Communion on first Sundays', 'checkbox', 'Shows “Communion Sunday” next to first-Sunday dates.' ),
			),
		),
		'watch'   => array(
			'title'  => 'Watch & newsletter',
			'help'   => 'The “Watch” section on the home page and the newsletter sign-up.',
			'fields' => array(
				'latest_video_url'   => array( 'Latest service video', 'url', 'Paste the Facebook or YouTube link to last Sunday’s service. YouTube links play right on the page. Leave blank to point people to all past services.' ),
				'latest_video_title' => array( 'Video title (optional)', 'text', 'Example: Sunday worship · Nov 16 · “Still Speaking”' ),
				'videos_url'         => array( 'All past services', 'url', 'Where the “Past services” button goes.' ),
				'newsletter_form_id' => array( 'Constant Contact form number', 'text', 'If the Constant Contact Forms plugin is active, this form is shown on the page. Otherwise visitors get a button to the sign-up page below.' ),
				'newsletter_url'     => array( 'Newsletter sign-up page', 'url' ),
			),
		),
		'rent'    => array(
			'title'  => 'Renting the building',
			'help'   => 'Prices and contact on the “Rent our space” page. Write prices the way you want them shown. Leave one blank to hide that line.',
			'fields' => array(
				'rent_sanctuary' => array( 'Sanctuary only', 'text' ),
				'rent_both'      => array( 'Sanctuary & Fellowship Hall', 'text' ),
				'rent_hall_day'  => array( 'Fellowship Hall, by the day', 'text' ),
				'rent_hall_hour' => array( 'Fellowship Hall, by the hour', 'text' ),
				'rent_deposit'   => array( 'Deposit', 'text' ),
				'rent_phone'     => array( 'Rental phone', 'text' ),
				'rent_email'     => array( 'Rental email', 'email' ),
				'rent_note'      => array( 'Extra note (optional)', 'textarea-short', 'Example: Booked through spring; ask about summer dates.' ),
			),
		),
		'notice'  => array(
			'title'  => 'Announcement bar',
			'help'   => 'A thin bar across the top of every page. Leave blank to hide it. Good for weather closings or a special service.',
			'fields' => array(
				'announcement_text' => array( 'Message', 'text', 'Example: Christmas Eve candlelight service, Dec 24 at 7 p.m.' ),
				'announcement_link' => array( 'Link (optional)', 'url' ),
			),
		),
		'contact' => array(
			'title'  => 'Address & contact',
			'fields' => array(
				'street' => array( 'Street', 'text' ),
				'city'   => array( 'City', 'text' ),
				'state'  => array( 'State', 'text' ),
				'zip'    => array( 'ZIP', 'text' ),
				'phone'  => array( 'Phone', 'text' ),
				'email'  => array( 'Email', 'email' ),
			),
		),
		'pastor'  => array(
			'title'  => 'Pastor',
			'fields' => array(
				'pastor_name'  => array( 'Name', 'text' ),
				'pastor_role'  => array( 'Title', 'text' ),
				'pastor_since' => array( 'Serving since', 'text' ),
				'pastor_photo' => array( 'Photo', 'image' ),
				'pastor_short' => array( 'One-sentence intro (home page)', 'textarea-short' ),
				'pastor_bio'   => array( 'Full bio (Who we are page)', 'textarea', 'Leave a blank line between paragraphs.' ),
			),
		),
		'giving'  => array(
			'title'  => 'Giving',
			'fields' => array(
				'give_url'   => array( 'Online giving link', 'url' ),
				'pledge_url' => array( 'Pledge form link', 'url' ),
			),
		),
		'stats'   => array(
			'title'  => 'Home page numbers',
			'help'   => 'The four big numbers under “We were saying yes before it was easy.”',
			'fields' => array(
				'stat1_figure' => array( 'Number 1', 'text' ),
				'stat1_label'  => array( 'Label 1', 'text' ),
				'stat2_figure' => array( 'Number 2', 'text' ),
				'stat2_label'  => array( 'Label 2', 'text' ),
				'stat3_figure' => array( 'Number 3', 'text' ),
				'stat3_label'  => array( 'Label 3', 'text' ),
				'stat4_figure' => array( 'Number 4', 'text' ),
				'stat4_label'  => array( 'Label 4', 'text' ),
			),
		),
		'links'   => array(
			'title'  => 'Other links',
			'fields' => array(
				'facebook_url'      => array( 'Facebook', 'url', 'Social links show as icons in the footer. Leave one blank to hide it.' ),
				'instagram_url'     => array( 'Instagram', 'url' ),
				'youtube_url'       => array( 'YouTube', 'url' ),
				'tiktok_url'        => array( 'TikTok', 'url' ),
				'twitter_url'       => array( 'X / Twitter', 'url' ),
				'photos_url'        => array( 'Photo album', 'url' ),
				'directory_url'     => array( 'Member directory', 'url' ),
				'ona_statement_url' => array( 'Full ONA statement', 'url' ),
				'meta_description'  => array( 'Search engine description', 'textarea-short', 'The short summary Google shows under the church’s name.' ),
			),
		),
	);
}

function faith_sanitize_options( $input ) {
	$clean = array();
	$input = is_array( $input ) ? $input : array();
	foreach ( faith_option_fields() as $group ) {
		foreach ( $group['fields'] as $key => $def ) {
			$type = $def[1];
			$val  = isset( $input[ $key ] ) ? $input[ $key ] : '';
			switch ( $type ) {
				case 'checkbox':
					$clean[ $key ] = empty( $val ) ? 0 : 1;
					break;
				case 'url':
					$clean[ $key ] = esc_url_raw( trim( (string) $val ) );
					break;
				case 'email':
					$clean[ $key ] = sanitize_email( $val );
					break;
				case 'time':
					$clean[ $key ] = preg_match( '/^\d{1,2}:\d{2}$/', (string) $val ) ? $val : '';
					break;
				case 'image':
					$clean[ $key ] = absint( $val );
					break;
				case 'textarea':
				case 'textarea-short':
					$clean[ $key ] = sanitize_textarea_field( $val );
					break;
				default:
					$clean[ $key ] = sanitize_text_field( $val );
			}
		}
	}
	return $clean;
}

add_action( 'admin_init', function () {
	register_setting(
		'faith_options_group',
		'faith_options',
		array(
			'type'              => 'array',
			'sanitize_callback' => 'faith_sanitize_options',
			'default'           => array(),
		)
	);
} );

add_action( 'admin_menu', function () {
	add_menu_page(
		'Church Info',
		'Church Info',
		'edit_pages',
		'faith-church-info',
		'faith_render_settings_page',
		'dashicons-building',
		3
	);
} );

// Editors (not just admins) may save Church Info.
add_filter( 'option_page_capability_faith_options_group', fn() => 'edit_pages' );

add_action( 'admin_enqueue_scripts', function ( $hook ) {
	if ( 'toplevel_page_faith-church-info' !== $hook ) {
		return;
	}
	wp_enqueue_media();
	wp_enqueue_style( 'faith-admin', FAITH_URI . '/assets/css/admin.css', array(), FAITH_VERSION );
	wp_enqueue_script( 'faith-admin', FAITH_URI . '/assets/js/admin.js', array( 'jquery' ), FAITH_VERSION, true );
} );

function faith_render_settings_page() {
	$o = faith_opts();
	?>
	<div class="wrap faith-settings">
		<h1>Church Info</h1>
		<p class="faith-lede">Change anything here and press <strong>Save changes</strong>. The website updates right away.</p>
		<?php settings_errors(); ?>
		<form method="post" action="options.php">
			<?php settings_fields( 'faith_options_group' ); ?>
			<?php foreach ( faith_option_fields() as $gid => $group ) : ?>
				<section class="faith-card" id="faith-<?php echo esc_attr( $gid ); ?>">
					<h2><?php echo esc_html( $group['title'] ); ?></h2>
					<?php if ( ! empty( $group['help'] ) ) : ?>
						<p class="description"><?php echo esc_html( $group['help'] ); ?></p>
					<?php endif; ?>
					<table class="form-table" role="presentation"><tbody>
					<?php
					foreach ( $group['fields'] as $key => $def ) :
						$label = $def[0];
						$type  = $def[1];
						$help  = isset( $def[2] ) ? $def[2] : '';
						$name  = 'faith_options[' . $key . ']';
						$id    = 'faith_' . $key;
						$val   = $o[ $key ];
						?>
						<tr>
							<th scope="row"><label for="<?php echo esc_attr( $id ); ?>"><?php echo esc_html( $label ); ?></label></th>
							<td>
							<?php if ( 'checkbox' === $type ) : ?>
								<label><input type="checkbox" id="<?php echo esc_attr( $id ); ?>" name="<?php echo esc_attr( $name ); ?>" value="1" <?php checked( ! empty( $val ) ); ?>> Yes</label>
							<?php elseif ( 'textarea' === $type ) : ?>
								<textarea id="<?php echo esc_attr( $id ); ?>" name="<?php echo esc_attr( $name ); ?>" rows="8" class="large-text"><?php echo esc_textarea( $val ); ?></textarea>
							<?php elseif ( 'textarea-short' === $type ) : ?>
								<textarea id="<?php echo esc_attr( $id ); ?>" name="<?php echo esc_attr( $name ); ?>" rows="3" class="large-text"><?php echo esc_textarea( $val ); ?></textarea>
							<?php elseif ( 'image' === $type ) : ?>
								<div class="faith-image-field">
									<img src="<?php echo esc_url( 'pastor_photo' === $key ? faith_pastor_photo_url() : '' ); ?>" alt="" class="faith-image-preview">
									<input type="hidden" id="<?php echo esc_attr( $id ); ?>" name="<?php echo esc_attr( $name ); ?>" value="<?php echo esc_attr( (string) $val ); ?>">
									<button type="button" class="button faith-image-pick" data-target="<?php echo esc_attr( $id ); ?>">Choose photo</button>
									<button type="button" class="button-link faith-image-clear" data-target="<?php echo esc_attr( $id ); ?>" data-default="<?php echo esc_url( faith_img( 'pastor-carla.webp' ) ); ?>">Use original photo</button>
								</div>
							<?php else : ?>
								<input type="<?php echo esc_attr( $type ); ?>" id="<?php echo esc_attr( $id ); ?>" name="<?php echo esc_attr( $name ); ?>" value="<?php echo esc_attr( (string) $val ); ?>" class="<?php echo in_array( $type, array( 'url', 'text', 'email' ), true ) ? 'regular-text' : ''; ?>">
							<?php endif; ?>
							<?php if ( $help ) : ?>
								<p class="description"><?php echo esc_html( $help ); ?></p>
							<?php endif; ?>
							</td>
						</tr>
					<?php endforeach; ?>
					</tbody></table>
				</section>
			<?php endforeach; ?>
			<div class="faith-save"><?php submit_button( 'Save changes', 'primary large', 'submit', false ); ?></div>
		</form>
	</div>
	<?php
}
