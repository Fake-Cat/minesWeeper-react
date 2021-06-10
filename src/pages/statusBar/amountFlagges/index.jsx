import { useEffect } from 'react';

import styles from '../index.module.css';

export const AmountFlagges = ({ flags }) => {
    useEffect(() => {}, [flags]);
    return (
        <div className={styles.timer}>
            {flags >= 10 ? '0' + flags : '00' + flags}
        </div>
    );
};
