import styles from './index.module.css';

export const FieldContainer = ({ children }) => {
    return (
        <section>
                <div className={styles.field_container}>{children}</div>
        </section>
    );
};
