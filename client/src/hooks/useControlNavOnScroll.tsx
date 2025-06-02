import { useState, useEffect } from 'react';

export function useControlNavOnScroll() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    function controlNav() {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY = currentScrollY;
    }
    window.addEventListener('scroll', controlNav);
    return () => window.removeEventListener('scroll', controlNav);
  }, []);

  return visible;
}
