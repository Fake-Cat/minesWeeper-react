import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    currentLevels,
    settings,
} from '../../features/levels/modules/selectors';
import { board, statusGame } from '../../features/game/modules/selector';

import {
    cellToggleStatus,
    createBoard,
    startGame,
    cellToggleFlagged,
} from '../../features/game/modules/action';
import { initialGameLevel } from '../../features/levels/modules/action';

import { GameContainer } from '../../shared/ui/gameContainer';
import { Logo } from '../../shared/ui/logo';
import { StatusBar } from '../../shared/ui/statusBar';
import { FieldContainer } from '../../shared/ui/fieldContainer';
import { Field } from '../../shared/ui/field';

import { GameSettings } from '../gameSettings';
import { AmountFlagges } from '../statusBar/amountFlagges';
import { FaceEmotions } from '../statusBar/faceEmotions';
import { GameTimer } from '../statusBar/gameTimer';
import { GameCell } from '../gameCell';


export const GameWindow = React.memo(() => {
    const dispatch = useDispatch();

    let initialBoard = useSelector(board);

    const { Beginner } = useSelector(settings);

    const countMines = useSelector(currentLevels);

    const { start, win, lose, flags } = useSelector(statusGame);

    const [pressed, setPressed] = useState(false);

    useEffect(() => {
        const { width, height, mines } = Beginner;
        dispatch(initialGameLevel(Beginner));
        dispatch(createBoard(width, height, mines));
    }, [dispatch, Beginner]);

    const cellStatusFlagged = (cell) => {
        if (cell.isRevealed) {
            return;
        }
        if (!start) {
            dispatch(startGame());
        }
        const { mines } = countMines;
        dispatch(cellToggleFlagged(initialBoard, cell, mines, flags));
    };

    const toggleStatusCell = (cell) => {
        const { mines } = countMines;
        if (!start && cell.isMine) {
            return;
        }
        if (!start) {
            dispatch(startGame());
        }
        dispatch(cellToggleStatus(initialBoard, cell, mines));
    };

    return (
        <GameContainer>
            <Logo />
            <GameSettings /> {/*настройки игры*/}
            <StatusBar>
                <AmountFlagges flags={flags} /> {/*кол-во флагов*/}
                <FaceEmotions win={win} lose={lose} pressed={pressed} />{' '}
                {/*эмоции*/}
                <GameTimer start={start} win={win} lose={lose} />{' '}
                {/*таймер*/}
            </StatusBar>
            <FieldContainer>
                {initialBoard &&
                    initialBoard.map((row, x) => (
                        <Field key={x}>
                            {row &&
                                row.map((cell, y) => (
                                    <GameCell
                                        win={win}
                                        lose={lose}
                                        cellStatusFlagged={cellStatusFlagged}
                                        onMouseDown={() => setPressed(true)}
                                        onMouseUp={() => setPressed(false)}
                                        toggleStatusCell={toggleStatusCell}
                                        key={y}
                                        cell={{ ...cell, position: { x, y } }}
                                        /*игровая ячейка */
                                    />
                                ))}
                        </Field>
                    ))}
            </FieldContainer>
        </GameContainer>
    );
});
