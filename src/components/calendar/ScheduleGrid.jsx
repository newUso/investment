
import React, { useMemo } from 'react';
import styles from './ScheduleGrid.module.css';

//時刻の配列を生成(例: 9:00〜18:00を30分刻み)
function buildTimes(startHour, endHour, stepMinutes) {
    const slots = [];
    const totalMin = (endHour - startHour) * 60;
    for (let m = 0; m < totalMin; m += stepMinutes) {
        const hh = Math.floor((startHour * 60 + m) / 60);
        const mm = (startHour * 60 + m) % 60;
        slots.push(`${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`);
    }
    //終端の線(18:00など)を見出しとして見せたい場合は最後に追加
    slots.push(`${String(endHour).padStart(2, '0')}:00`);
    return slots;
}


export default function ScheduleGrid({
    people = [],
    startHour = 9,
    endHour = 18,
    stepMinutes = 30,
    onSlotClick = () => {},
}) {
    const times = useMemo(() => buildTimes(startHour, endHour, stepMinutes), [
        startHour, 
        endHour, 
        stepMinutes,
    ]);

    //実際にクリック可能な『枠』は終端を除いた times-1
    const slotTimes = times.slice(0, -1);

    return (
        <section className={styles.schedule}>
            <div 
                className={styles.schedule__grid}
                style={{
                    //列数・行高・時間列幅などはCSS変数で可変に
                    '--cols': people.length,
                    '--row-height': '44px',
                    '--time-col-width': '104px',
                }}
                role="grid"
                aria-rowcount={slotTimes.length + 1}
                aria-colcount={people.length + 1}
                aria-label="Time by People schedule grid"
            >
                {/* 左上の角(空) */}
                <div
                    className={`${styles.schedule__cell} ${styles['schedule__corner']}`}
                    aria-hidden="true"
                />
                {/* 1行目: 人名(列ヘッダー) */}
                {people.map((name, colIdx) => (
                    <div
                        key={name}
                        className={`${styles.schedule__cell} ${styles['schedule__head']}`}
                        style= {{ gridColumn: colIdx + 2, gridRow: 1}}
                        role="columnheader"
                    >
                        {name}
                    </div>
                ))}

                {/* 1列目: 時間(行ヘッダー) */}
                {times.map((t, rowIdx) => (
                    <div
                        key={`time-${t}-${rowIdx}`}
                        className={`${styles.schedule__cell} ${styles['schedule__time']}`}
                        style= {{ gridColumn: 1, gridRow: rowIdx + 2}}
                        role="rowheader"
                    >
                        {t}
                    </div>
                ))}

                {/* 本体スロット(時間✖️人) */}
                {slotTimes.map((t, rowIdx) =>
                    people.map((person, colIdx) => (
                        <button
                            key={`slot-${t}-${person}`}
                            className={`${styles.schedule__cell} ${styles['schedule__slot']}`}
                            style={{ gridColumn: colIdx + 2, gridRow: rowIdx + 2}}
                            aria-label={`${t}の${person}の枠`}
                            onClick={() => onSlotClick(t, person)}
                        />
                    ))
                )}
            </div>  
        </section>
    );
}