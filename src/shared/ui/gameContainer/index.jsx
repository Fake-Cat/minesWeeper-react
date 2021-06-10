import styles from './index.module.css';

export const GameContainer = ({ children }) => {
    return (
        <main
            onContextMenu={(e) => e.preventDefault()}
            className={styles.window}
        >
            {children}
        </main>
    );
};
