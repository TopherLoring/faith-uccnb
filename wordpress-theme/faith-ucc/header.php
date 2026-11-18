<?php
/**
 * Site header, announcement bar and full-screen menu.
 */
$faith_section = faith_current_section();
$faith_nav     = array(
	'visit'     => 'Visit',
	'about'     => 'Who we are',
	'community' => 'Community',
	'news'      => 'News',
	'give'      => 'Give',
);
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a class="skip-link" href="#main">Skip to content</a>

<?php if ( faith_opt( 'announcement_text' ) ) : ?>
	<div class="announce">
		<div class="wrap announce-inner">
			<?php if ( faith_opt( 'announcement_link' ) ) : ?>
				<a href="<?php echo esc_url( faith_opt( 'announcement_link' ) ); ?>"><?php echo esc_html( faith_opt( 'announcement_text' ) ); ?> <?php echo faith_icon( 'arrow' ); // phpcs:ignore ?></a>
			<?php else : ?>
				<span><?php echo esc_html( faith_opt( 'announcement_text' ) ); ?></span>
			<?php endif; ?>
		</div>
	</div>
<?php endif; ?>

<header class="site-header" data-header>
	<div class="wrap site-header-inner">
		<?php get_template_part( 'parts/wordmark', null, array( 'mono' => true ) ); ?>

		<nav class="nav-primary" aria-label="Primary">
			<?php foreach ( $faith_nav as $slug => $label ) : ?>
				<a href="<?php echo esc_url( faith_page_url( $slug ) ); ?>" class="nav-link<?php echo $faith_section === $slug ? ' is-current' : ''; ?>"<?php echo $faith_section === $slug ? ' aria-current="page"' : ''; ?>><?php echo esc_html( $label ); ?></a>
			<?php endforeach; ?>
		</nav>

		<div class="site-header-end">
			<span class="header-status"><?php get_template_part( 'parts/sunday-status', null, array( 'compact' => true, 'light' => true ) ); ?></span>
			<button type="button" class="menu-btn" data-menu-open aria-expanded="false" aria-controls="site-menu">
				<span class="menu-btn-label"><span class="lbl-narrow">Menu</span><span class="lbl-wide">Explore</span></span> <span class="menu-btn-bars" aria-hidden="true"><span></span><span></span></span>
			</button>
		</div>
	</div>
</header>

<?php get_template_part( 'parts/menu-overlay' ); ?>

<main id="main" tabindex="-1">
