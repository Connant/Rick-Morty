import { useState, useEffect } from 'react';

const useViewControls = (defaultView: 'grid view' | 'table view' = 'table view') => {
  const [view, setView] = useState<'grid view' | 'table view'>(defaultView);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  const handleChangeView = () => {
    setView(view === 'table view' ? 'grid view' : 'table view');
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
    return () => {
      window.removeEventListener('scroll', handleScroll);
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