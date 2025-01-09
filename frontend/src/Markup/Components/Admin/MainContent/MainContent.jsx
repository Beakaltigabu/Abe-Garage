import React, { useEffect } from 'react';
import { useSidebar } from '../../../../Context/SidebarContext';
import styles from './MainContent.module.css';

const MainContent = ({ children }) => {
  const { isOpen } = useSidebar();

  useEffect(() => {
    //console.log('MainContent rendered with children:', children);
  }, [children]);

  //console.log('MainContent rendering, isOpen:', isOpen);

  return (
    <main className={`${styles.mainContent} ${!isOpen ? styles.expanded : ''}`}>
      {children}
    </main>
  );
};

export default MainContent;
