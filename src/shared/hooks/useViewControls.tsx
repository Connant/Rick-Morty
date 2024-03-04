import { useState, useEffect } from 'react';

const useViewControls = (defaultView: 'grid view' | 'table view' = 'table view') => {
  const [view, setView] = useState<'grid view' | 'table view'>(
    localStorage.getItem('view') as 'grid view' | 'table view' || defaultView
  );
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const handleChangeView = () => {
    const nextView = view === 'table view' ? 'grid view' : 'table view';
    setView(nextView);
    localStorage.setItem('view', nextView);
    window.scrollTo(0, 0);
  };

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    const handleStorageChange = () => {
      const storedView = localStorage.getItem('view');
      if (storedView) {
        setView(storedView as 'grid view' | 'table view');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return {
    view,
    showScrollTop,
    handleChangeView,
    scrollToTop,
  };
};

export default useViewControls;