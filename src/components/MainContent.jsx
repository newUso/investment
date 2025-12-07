import React from 'react';
import styles from './MainContent.module.css';
import ScheduleGrid from './calendar/ScheduleGrid';

function MainContent() {
  return (
    <main className={`app-container__main ${styles.main}`}>
      <h2 className={styles.main__title}>Team Schedule</h2>

      <ScheduleGrid
        people={['Alice', 'Bob', 'Carol']}
        startHour={9}
        endHour={18}
        setpMinutes={30}
        onSlotClick={(t, person) => {
          //ここで表示やイベント作成につなげる
          console.log('slot clicked:', t, person);
        }}
      />
    </main>
  );
}

export default MainContent;