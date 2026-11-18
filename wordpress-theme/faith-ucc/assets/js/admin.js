/* Photo picker on the Church Info page. */
(function ($) {
  $(document).on('click', '.faith-image-pick', function (e) {
    e.preventDefault();
    var target = $('#' + $(this).data('target'));
    var preview = $(this).siblings('.faith-image-preview');
    var frame = wp.media({ title: 'Choose a photo', button: { text: 'Use this photo' }, library: { type: 'image' }, multiple: false });
    frame.on('select', function () {
      var a = frame.state().get('selection').first().toJSON();
      target.val(a.id);
      preview.attr('src', (a.sizes && a.sizes.medium ? a.sizes.medium.url : a.url));
    });
    frame.open();
  });
  $(document).on('click', '.faith-image-clear', function (e) {
    e.preventDefault();
    $('#' + $(this).data('target')).val('0');
    $(this).siblings('.faith-image-preview').attr('src', $(this).data('default'));
  });
})(jQuery);
