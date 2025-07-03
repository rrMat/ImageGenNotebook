(function($) {
    'use strict';

    $(document).ready(function() {
        var modal = $('#imageModal');
        var modalImg = $('#modalImage');
        var captionText = $('#caption');
        var closeBtn = $('.close');
        
        // Transform state
        var scale = 1;
        var translateX = 0;
        var translateY = 0;
        var minScale = 0.5;
        var maxScale = 5;
        
        // Dragging state
        var isDragging = false;
        var lastX = 0;
        var lastY = 0;

        function updateTransform() {
            modalImg.css('transform', `scale(${scale}) translate(${translateX}px, ${translateY}px)`);
        }

        function resetTransform() {
            scale = 1;
            translateX = 0;
            translateY = 0;
            updateTransform();
        }

        // Add click event to all images
        $('.image.fit img, .image.main img').on('click', function() {
            modal.show();
            modalImg.attr('src', this.src);
            captionText.text($(this).attr('alt'));
            resetTransform();
        });

        // Mouse wheel zoom
        modalImg.on('wheel', function(e) {
            e.preventDefault();
            var delta = e.originalEvent.deltaY;
            var zoomSpeed = 0.1;
            
            if (delta < 0) {
                scale = Math.min(maxScale, scale + zoomSpeed);
            } else {
                scale = Math.max(minScale, scale - zoomSpeed);
            }
            
            updateTransform();
        });

        // Mouse drag events
        modalImg.on('mousedown', function(e) {
            if (scale > 1) {
                isDragging = true;
                lastX = e.clientX;
                lastY = e.clientY;
                $(this).css('cursor', 'grabbing');
                e.preventDefault();
            }
        });

        $(document).on('mousemove', function(e) {
            if (isDragging) {
                var deltaX = e.clientX - lastX;
                var deltaY = e.clientY - lastY;
                
                translateX += deltaX;
                translateY += deltaY;
                
                lastX = e.clientX;
                lastY = e.clientY;
                
                updateTransform();
            }
        });

        $(document).on('mouseup', function() {
            if (isDragging) {
                isDragging = false;
                modalImg.css('cursor', scale > 1 ? 'grab' : 'pointer');
            }
        });

        // Touch events for mobile
        var lastTouchX = 0;
        var lastTouchY = 0;

        modalImg.on('touchstart', function(e) {
            if (scale > 1 && e.touches.length === 1) {
                isDragging = true;
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
                e.preventDefault();
            }
        });

        modalImg.on('touchmove', function(e) {
            if (isDragging && e.touches.length === 1) {
                var deltaX = e.touches[0].clientX - lastTouchX;
                var deltaY = e.touches[0].clientY - lastTouchY;
                
                translateX += deltaX;
                translateY += deltaY;
                
                lastTouchX = e.touches[0].clientX;
                lastTouchY = e.touches[0].clientY;
                
                updateTransform();
                e.preventDefault();
            }
        });

        modalImg.on('touchend', function() {
            isDragging = false;
        });

        // Double-click to reset
        modalImg.on('dblclick', function() {
            resetTransform();
        });

        // Update cursor based on zoom level
        modalImg.on('load', function() {
            $(this).css('cursor', scale > 1 ? 'grab' : 'pointer');
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
