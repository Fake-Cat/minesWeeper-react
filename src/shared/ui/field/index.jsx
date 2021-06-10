import styles from './index.module.css';

export const Field = ({ children }) => {
    return <div className={styles.field}>{children}</div>;
};
