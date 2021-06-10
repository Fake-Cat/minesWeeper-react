import { useEffect, useState } from 'react';

import styles from '../index.module.css';

export const GameTimer = ({ start, win, lose }) => {
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (start && !win && !lose) {
            setTimer(1);
            const time = setInterval(() => setTimer((prev) => prev + 1), 1000);
            return () => {
                clearInterval(time);
            };
        }
        if (!start) {
            setTimer(0);
        }
    }, [start, win, lose]);

    return (
        <div className={styles.timer}>
            {timer > 99 ? timer : timer > 9 ? '0' + timer : '00' + timer}
        </div>
    );
};
