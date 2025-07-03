(function($) {
    'use strict';

    $(document).ready(function() {
        var modal = $('#imageModal');
        var modalImg = $('#modalImage');
        var captionText = $('#caption');
        var closeBtn = $('.close');
        
        // Gallery state
        var currentImageIndex = 0;
        var imageElements = [];
        
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

        function showImage(index) {
            if (index < 0 || index >= imageElements.length) return;
            
            currentImageIndex = index;
            var img = imageElements[index];
            var fullSrc = $(img).data('full') || img.src;
            
            modalImg.attr('src', fullSrc);
            captionText.text($(img).attr('alt') + ` (${index + 1} of ${imageElements.length})`);
            resetTransform();
            
            // Update navigation button states
            updateNavigationButtons();
        }

        function updateNavigationButtons() {
            $('.modal-prev').toggleClass('disabled', currentImageIndex === 0);
            $('.modal-next').toggleClass('disabled', currentImageIndex === imageElements.length - 1);
        }

        function goToPrevious() {
            if (currentImageIndex > 0) {
                showImage(currentImageIndex - 1);
            }
        }

        function goToNext() {
            if (currentImageIndex < imageElements.length - 1) {
                showImage(currentImageIndex + 1);
            }
        }

        // Initialize gallery - collect all images on page load
        function initializeGallery() {
            imageElements = $('.image.fit img, .image.main img').get();
        }

        // Add click event to all images
        $(document).on('click', '.image.fit img, .image.main img', function() {
            initializeGallery();
            currentImageIndex = imageElements.indexOf(this);
            modal.show();
            showImage(currentImageIndex);
            $('body').addClass('modal-open');
        });

        // Keyboard navigation
        $(document).on('keydown', function(e) {
            if (!modal.is(':visible')) return;
            
            switch(e.key) {
                case 'Escape':
                    modal.hide();
                    $('body').removeClass('modal-open');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    goToPrevious();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    goToNext();
                    break;
            }
        });

        // Navigation button events
        $(document).on('click', '.modal-prev:not(.disabled)', goToPrevious);
        $(document).on('click', '.modal-next:not(.disabled)', goToNext);

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
            $('body').removeClass('modal-open');
        });

        modal.on('click', function(event) {
            if (event.target === this) {
                modal.hide();
                $('body').removeClass('modal-open');
            }
        });
    });

})(jQuery);
