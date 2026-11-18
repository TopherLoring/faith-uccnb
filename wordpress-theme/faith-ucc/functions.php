<?php
/**
 * Faith UCC theme bootstrap.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'FAITH_VERSION', '1.2.0' );
define( 'FAITH_DIR', get_template_directory() );
define( 'FAITH_URI', get_template_directory_uri() );

require FAITH_DIR . '/inc/helpers.php';
require FAITH_DIR . '/inc/settings.php';
require FAITH_DIR . '/inc/content-types.php';
require FAITH_DIR . '/inc/schedule.php';
require FAITH_DIR . '/inc/setup.php';
require FAITH_DIR . '/inc/admin.php';
require FAITH_DIR . '/inc/seed.php';
