import React from 'react';

import {
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
} from '../../shared/ui/icon/cell/';
import { MineRelevead, MineWrong } from '../../shared/ui/icon/mine';
import { Flagged } from '../../shared/ui/icon/flagged';

import styled from './index.module.css';


export const GameCell = React.memo(
    ({
        cell,
        toggleStatusCell,
        onMouseDown,
        onMouseUp,
        win,
        lose,
        cellStatusFlagged,
    }) => {
        const { value, isRevealed, exploded, isFlagged } = cell;

        const renderingValueCondition = (value) => {
            switch (value) {
                case 'x':
                    return <MineRelevead />;
                case 'x-wrong':
                    return <MineWrong />;
                case 0:
                    return '';
                case 1:
                    return <One />;
                case 2:
                    return <Two />;
                case 3:
                    return <Three />;
                case 4:
                    return <Four />;
                case 5:
                    return <Five />;
                case 6:
                    return <Six />;
                case 7:
                    return <Seven />;
                case 8:
                    return <Eight />;
                default:
                    return value;
            }
        };

        return (
            <button
                disabled={win || lose || isFlagged}
                onContextMenu={() => cellStatusFlagged(cell)}
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onClick={() => toggleStatusCell(cell)}
                className={
                    exploded
                        ? styled.red
                        : isRevealed
                        ? styled.active
                        : styled.game_cell
                }
            >
                {isFlagged && !isRevealed ? (
                    <Flagged />
                ) : isRevealed ? (
                    renderingValueCondition(value)
                ) : (
                    ''
                )}
            </button>
        );
    }
);
