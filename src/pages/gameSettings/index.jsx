import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { settings } from '../../features/levels/modules/selectors';

import {
    createBoard,
    createNewGame,
} from '../../features/game/modules/action';
import { initialGameLevel } from '../../features/levels/modules/action';

import { Checked } from '../../shared/ui/icon/checked';

import styles from './index.module.css';

export const GameSettings = () => {
    const dispatch = useDispatch();

    const settingsGame = useSelector(settings);

    const [active, setActive] = useState('');

    const [openSettings, setOpenSettings] = useState(false);

    const gameChangeLevels = (levels) => {
        const { width, height, mines } = levels;
        dispatch(createNewGame());
        dispatch(initialGameLevel(levels));
        dispatch(createBoard(width, height, mines));
    };

    const changeSelectItem = (item) => {
        setActive(item);
        gameChangeLevels(item);
        setOpenSettings(!openSettings);
    };

    const settingsOpen = () => {
        setOpenSettings(!openSettings);
    };

    const gameReload = () => {
        gameChangeLevels(active);
        setOpenSettings(!openSettings);
    };

    useEffect(() => {
        setActive(settingsGame.Beginner);
    }, [setActive, settingsGame.Beginner]);

    return (
        <>
            <button onClick={settingsOpen} className={styles.settings}>
                Game
            </button>
            {openSettings ? (
                <div className={styles.settings_container}>
                    <ul className={styles.settings_wrapper}>
                        <li
                            onClick={gameReload}
                            className={styles.settings_item}
                        >
                            New
                        </li>
                        {settingsGame &&
                            Object.values(settingsGame).map((item, key) => (
                                <li
                                    onClick={() => changeSelectItem(item)}
                                    key={key}
                                    className={styles.settings_item}
                                >
                                    {active.name === item.name ? (
                                        <>
                                            <Checked />
                                            {item.name}
                                        </>
                                    ) : (
                                        item.name
                                    )}
                                </li>
                            ))}
                        <li className={styles.settings_item}>About</li>
                    </ul>
                </div>
            ) : (
                ''
            )}
        </>
    );
};
