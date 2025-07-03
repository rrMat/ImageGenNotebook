(function($) {
    'use strict';

    $(document).ready(function() {
        var modal = $('#imageModal');
        var modalImg = $('#modalImage');
        var captionText = $('#caption');
        var closeBtn = $('.close');
        var scale = 1;
        var minScale = 0.5;
        var maxScale = 5;

        // Add click event to all images
        $('.image.fit img, .image.main img').on('click', function() {
            modal.show();
            modalImg.attr('src', this.src);
            captionText.text($(this).attr('alt'));
            scale = 1; // Reset zoom
            modalImg.css('transform', 'scale(' + scale + ')');
        });

        // Mouse wheel zoom
        modalImg.on('wheel', function(e) {
            e.preventDefault();
            var delta = e.originalEvent.deltaY;
            var zoomSpeed = 0.1;
            
            if (delta < 0) {
                // Zoom in
                scale = Math.min(maxScale, scale + zoomSpeed);
            } else {
                // Zoom out
                scale = Math.max(minScale, scale - zoomSpeed);
            }
            
            $(this).css('transform', 'scale(' + scale + ')');
        });

        // Double-click to reset zoom
        modalImg.on('dblclick', function() {
            scale = 1;
            $(this).css('transform', 'scale(' + scale + ')');
        });

        // Close modal events
        closeBtn.on('click', function() {
            modal.hide();
        });

        modal.on('click', function(event) {
            if (event.target === this) {
                modal.hide();
            }
        });

        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.hide();
            }
        });
    });

})(jQuery);
