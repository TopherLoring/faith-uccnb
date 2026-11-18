<?php
/**
 * "This Sunday · Nov 23 · 10 a.m." Rendered generically on the server (pages may be cached),
 * then filled in with the live date and status by theme.js.
 */
$compact = ! empty( $args['compact'] );
$light   = ! empty( $args['light'] );
$label   = faith_time_label( faith_opt( 'worship_start' ) );
?>
<span class="sunday-status<?php echo $light ? ' is-light' : ''; ?>" data-sunday-status<?php echo $compact ? ' data-compact' : ''; ?>>
	<span class="ss-day">Sundays</span>
	<span class="ss-meta"><?php echo esc_html( $label . ( $compact ? '' : ' · In person & on Zoom' ) ); ?></span>
</span>
