import { useDispatch, useSelector } from 'react-redux';

import { currentLevels } from '../../../features/levels/modules/selectors';
import {
    createBoard,
    createNewGame,
} from '../../../features/game/modules/action';

import { Smile } from '../../../shared/ui/icon/smile/smile';
import { Sunglasses } from '../../../shared/ui/icon/smile/sunglasses';
import { Sad } from '../../../shared/ui/icon/smile/sad';
import { Afraid } from '../../../shared/ui/icon/smile/afraid';

import styles from '../index.module.css';

export const FaceEmotions = ({ win, lose, pressed }) => {
    const dispatch = useDispatch();
    const { width, height, mines } = useSelector(currentLevels);

    const reloadGame = () => {
        dispatch(createNewGame());
        dispatch(createBoard(width, height, mines));
    };
    return (
        <button onClick={reloadGame} className={styles.smile_button}>
            {pressed ? (
                <Afraid />
            ) : win ? (
                <Sunglasses />
            ) : lose ? (
                <Sad />
            ) : (
                <Smile />
            )}
        </button>
    );
};
