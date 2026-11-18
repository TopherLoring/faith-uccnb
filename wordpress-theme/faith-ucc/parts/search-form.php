<?php
/**
 * Site search box. $args: id (unique per page), class.
 */
$sid   = $args['id'] ?? 'site-search';
$class = $args['class'] ?? '';
?>
<form role="search" method="get" class="search-form <?php echo esc_attr( $class ); ?>" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label class="screen-reader-text" for="<?php echo esc_attr( $sid ); ?>">Search the site</label>
	<?php echo faith_icon( 'search' ); // phpcs:ignore ?>
	<input type="search" id="<?php echo esc_attr( $sid ); ?>" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="Search the site" autocomplete="off" data-search-input>
	<button type="submit" class="search-go">Search</button>
</form>
