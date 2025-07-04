import PhotoSwipeLightbox from 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe-lightbox.esm.min.js';

// Find all gallery containers on the page
const galleries = document.querySelectorAll('.pswp-gallery');

galleries.forEach(gallery => {
  const lightbox = new PhotoSwipeLightbox({
    gallery: `#${gallery.id}`,
    children: 'a',
    mouseMovePan: true,
    initialZoomLevel: 'fit',
    secondaryZoomLevel: 3,
    maxZoomLevel: 10,
    pswpModule: () => import('https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.4.4/photoswipe.esm.min.js')
  });

  // Add custom caption support
  lightbox.on('uiRegister', function() {
    lightbox.pswp.ui.registerElement({
      name: 'custom-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: 'Caption text',
      onInit: (el, pswp) => {
        lightbox.pswp.on('change', () => {
          const currSlideElement = lightbox.pswp.currSlide.data.element;
          let captionHTML = '';
          if (currSlideElement) {
            captionHTML = currSlideElement.getAttribute('data-pswp-caption') || 
                         currSlideElement.querySelector('img').getAttribute('alt') || '';
          }
          el.innerHTML = captionHTML;
        });
      }
    });
  });

  lightbox.init();
});