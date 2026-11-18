<?php
/**
 * A friendlier dashboard: one welcome box with the jobs people actually come to do.
 */

add_action( 'wp_dashboard_setup', function () {
	remove_action( 'welcome_panel', 'wp_welcome_panel' );
	wp_add_dashboard_widget( 'faith_quick', 'Update the website', 'faith_render_dashboard_widget' );

	// Put ours first.
	global $wp_meta_boxes;
	$dash = $wp_meta_boxes['dashboard']['normal']['core'] ?? array();
	if ( isset( $dash['faith_quick'] ) ) {
		$ours = array( 'faith_quick' => $dash['faith_quick'] );
		unset( $dash['faith_quick'] );
		$wp_meta_boxes['dashboard']['normal']['core'] = array_merge( $ours, $dash );
	}
	// Remove the noise.
	remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
	remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
} );

function faith_render_dashboard_widget() {
	$next = faith_upcoming_events( 3 );
	$jobs = array(
		array( 'Add an event', admin_url( 'post-new.php?post_type=faith_event' ), 'Christmas Eve, a potluck, a special speaker.' ),
		array( 'Write a news post', admin_url( 'post-new.php' ), 'Newsletter, announcements, a note from the pastor.' ),
		array( 'Change Sunday info', admin_url( 'admin.php?page=faith-church-info' ), 'Zoom link, worship time, announcement bar.' ),
		array( 'Edit regular gatherings', admin_url( 'edit.php?post_type=faith_gathering' ), 'Book group title, Theology on Tap, game night.' ),
	);
	?>
	<div class="faith-dash">
		<?php foreach ( $jobs as $j ) : ?>
			<a class="faith-dash-job" href="<?php echo esc_url( $j[1] ); ?>">
				<strong><?php echo esc_html( $j[0] ); ?> →</strong>
				<span><?php echo esc_html( $j[2] ); ?></span>
			</a>
		<?php endforeach; ?>
	</div>
	<h3 class="faith-dash-h">Next events on the site</h3>
	<?php if ( $next ) : ?>
		<ul class="faith-dash-list">
			<?php foreach ( $next as $e ) : ?>
				<li><a href="<?php echo esc_url( get_edit_post_link( $e['id'] ) ); ?>"><?php echo esc_html( $e['title'] ); ?></a> — <?php echo esc_html( faith_fmt_date( $e['date'], 'D, M j' ) ); ?></li>
			<?php endforeach; ?>
		</ul>
	<?php else : ?>
		<p>No upcoming one-off events. Regular gatherings still show automatically.</p>
	<?php endif; ?>
	<p class="faith-dash-foot">Past events hide themselves. You never need to delete them.</p>
	<?php
}

add_action( 'admin_head', function () {
	?>
	<style>
		.faith-dash{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:4px 0 16px}
		.faith-dash-job{display:block;padding:14px;border:1px solid #dcdcde;border-radius:6px;text-decoration:none;background:#fff}
		.faith-dash-job:hover{border-color:#B4472A;box-shadow:0 0 0 1px #B4472A}
		.faith-dash-job strong{display:block;color:#1D1B18;font-size:14px}
		.faith-dash-job span{display:block;color:#646970;margin-top:4px}
		.faith-dash-h{margin:12px 0 6px!important}
		.faith-dash-list{margin:0 0 8px}
		.faith-dash-foot{color:#646970;font-style:italic}
		#faith_meta{margin-top:16px}.faith-meta-row{margin:0 0 14px}
		.faith-meta-row input[type=date],.faith-meta-row input[type=time],.faith-meta-row select{min-width:220px}
		@media (max-width:782px){.faith-dash{grid-template-columns:1fr}}
	</style>
	<?php
} );

/** Point "Visit site" style links on our types to the right place, and keep notices short. */
add_filter( 'post_updated_messages', function ( $messages ) {
	$simple = array( 1 => 'Saved. The website is updated.', 6 => 'Published. The website is updated.', 10 => 'Draft saved.' );
	foreach ( array( 'faith_event', 'faith_gathering', 'faith_milestone', 'faith_partner', 'faith_faq' ) as $t ) {
		$messages[ $t ] = $simple;
	}
	return $messages;
} );
