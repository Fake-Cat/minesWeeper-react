import styles from './index.module.css';

export const StatusBar = ({ children }) => {
    return (
        <section className={styles.status_bar}>
            <div className={styles.status_container}>{children}</div>
        </section>
    );
};
