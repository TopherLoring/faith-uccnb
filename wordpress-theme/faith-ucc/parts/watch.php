<?php
/**
 * Home page "Watch" block: Sunday live on Zoom, plus the latest service video.
 * A YouTube link plays in place (loaded only when someone presses play); any other link opens in a new tab.
 */
$o      = faith_opts();
$video  = $o['latest_video_url'];
$yt     = faith_youtube_id( $video );
$target = $video ? $video : $o['videos_url'];
$title  = $o['latest_video_title'] ? $o['latest_video_title'] : ( $video ? 'Last Sunday’s service' : 'Past services' );
$poster = $yt ? 'https://i.ytimg.com/vi/' . $yt . '/hqdefault.jpg' : faith_img( 'sanctuary.webp' );
?>
<section class="wrap section" id="watch">
	<div class="watch">
		<div class="watch-media reveal">
			<?php if ( $yt ) : ?>
				<button type="button" class="watch-frame photo" data-yt="<?php echo esc_attr( $yt ); ?>" aria-label="<?php echo esc_attr( 'Play: ' . $title ); ?>">
					<img src="<?php echo esc_url( $poster ); ?>" alt="" loading="lazy" decoding="async">
					<span class="watch-play"><?php echo faith_icon( 'play' ); // phpcs:ignore ?></span>
				</button>
			<?php elseif ( $target ) : ?>
				<a class="watch-frame photo" href="<?php echo esc_url( $target ); ?>" target="_blank" rel="noopener" aria-label="<?php echo esc_attr( 'Watch: ' . $title . ' (opens in a new tab)' ); ?>">
					<img src="<?php echo esc_url( $poster ); ?>" alt="" loading="lazy" decoding="async">
					<span class="watch-play"><?php echo faith_icon( 'play' ); // phpcs:ignore ?></span>
				</a>
			<?php endif; ?>
			<p class="caption"><?php echo esc_html( $title ); ?></p>
		</div>
		<div class="watch-copy">
			<p class="eyebrow reveal">Watch</p>
			<h2 class="display-lg reveal" style="--i:1">Can’t make it Sunday? <em class="accent">Come anyway.</em></h2>
			<p class="lede reveal" style="--i:2">Every Sunday at <?php echo esc_html( faith_time_label( $o['worship_start'] ) ); ?>, worship is live on Zoom. No sign-up, and your camera can stay off. Missed it? Past services are online.</p>
			<div class="watch-status reveal" style="--i:3"><?php get_template_part( 'parts/sunday-status' ); ?></div>
			<div class="btn-row reveal" style="--i:3">
				<a class="btn btn-primary" href="<?php echo esc_url( $o['zoom_url'] ); ?>" target="_blank" rel="noopener">Join on Zoom <?php echo faith_icon( 'arrow-up-right' ); // phpcs:ignore ?></a>
				<?php if ( $o['videos_url'] ) : ?>
					<a class="btn btn-ghost" href="<?php echo esc_url( $o['videos_url'] ); ?>" target="_blank" rel="noopener">Past services</a>
				<?php endif; ?>
			</div>
			<?php if ( $o['zoom_id'] ) : ?>
				<p class="small muted watch-id">Zoom meeting ID <?php echo esc_html( $o['zoom_id'] ); ?></p>
			<?php endif; ?>
		</div>
	</div>
</section>
