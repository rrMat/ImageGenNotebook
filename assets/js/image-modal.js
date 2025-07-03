(function($) {
    'use strict';

    $(document).ready(function() {
        // Get the modal
        var modal = $('#imageModal');
        var modalImg = $('#modalImage');
        var captionText = $('#caption');
        var closeBtn = $('.close');

        // Add click event to all images within .image.fit containers
        $('.image.fit img, .image.main img').on('click', function() {
            var $this = $(this);
            var src = $this.attr('src');
            var alt = $this.attr('alt');
            
            // Show modal
            modal.css('display', 'block');
            modalImg.attr('src', src);
            captionText.text(alt || '');
            
            // Prevent body scroll when modal is open
            $('body').addClass('modal-open');
        });

        // Close modal when clicking the X
        closeBtn.on('click', function() {
            closeModal();
        });

        // Close modal when clicking outside the image
        modal.on('click', function(event) {
            if (event.target === this) {
                closeModal();
            }
        });

        // Close modal with Escape key
        $(document).on('keydown', function(event) {
            if (event.key === 'Escape' && modal.is(':visible')) {
                closeModal();
            }
        });

        // Function to close modal
        function closeModal() {
            modal.css('display', 'none');
            $('body').removeClass('modal-open');
        }

        // Prevent image dragging in modal
        modalImg.on('dragstart', function(e) {
            e.preventDefault();
        });
    });

})(jQuery);
