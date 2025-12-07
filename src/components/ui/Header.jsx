import React from 'react';
import styles from './Header.module.css';

function Header({ activeView, onChangeView }) {
  const isSchedule = activeView === 'schedule';
  const isFinance = activeView === 'finance'
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <h1 className={styles.header__title}>リーサル・ウェポン</h1>
        <nav className={styles.header__nav}>
          <button
            type="button"
            className={`${styles.header__navButton} ${
              isSchedule ? styles['header__navButton--activeView'] : ''
            }`}
            onClick={() => onChangeView('schedule')}
          >
            Team Schedule
          </button>

          <button 
            type="button"
            className={`${styles.header__navButton} ${
              isFinance ? styles['header__navButton--active'] : ''
            }`}
            onClick={() => onChangeView('finance')}
          >
            財務
          </button>
        </nav>
      </div>

      <h1>My Calendar App</h1>
    </header>
  );
}

export default Header;