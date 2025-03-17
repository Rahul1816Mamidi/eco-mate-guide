
// Animation variants for Framer Motion
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

export const slideUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const slideDown = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

export const staggerChildren = (staggerTime = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerTime
    }
  }
});

// Utility for smooth scroll to element
export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Lazy loading images
export const lazyLoadImage = (imgElement: HTMLImageElement, src: string) => {
  imgElement.classList.add('image-loading');
  
  const img = new Image();
  img.src = src;
  
  img.onload = () => {
    imgElement.src = src;
    setTimeout(() => {
      imgElement.classList.remove('image-loading');
      imgElement.classList.add('image-loaded');
    }, 100);
  };
};
