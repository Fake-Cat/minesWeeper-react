import * as types from './types.js';

export const createBoard = (width, height, mines) => {
    const flags = mines;
    const board = Array.from(
        {
            length: height,
        },
        () =>
            Array.from({
                length: width,
            }).fill(0)
    );

    let total = 0;
    while (total !== mines) {
        let x = Math.floor(Math.random() * height);
        let y = Math.floor(Math.random() * width);
        if (board[x][y] !== undefined && board[x][y] !== 'x') {
            board[x][y] = 'x';
            total++;
        }
    }

    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            if (board[x][y] === 'x') {
                if (board[x] && board[x][y + 1] !== undefined) {
                    // x на месте у справа
                    if (board[x][y + 1] !== 'x') {
                        board[x][y + 1] = board[x][y + 1] + 1;
                    }
                }
                if (board[x] && board[x][y - 1] !== undefined) {
                    // x на месте у слева
                    if (board[x][y - 1] !== 'x') {
                        board[x][y - 1] = board[x][y - 1] + 1;
                    }
                }
                if (
                    board[x + 1] !== undefined &&
                    board[x + 1][y] !== undefined
                ) {
                    // x сверху у на месте
                    if (board[x + 1] && board[x + 1][y] !== 'x') {
                        board[x + 1][y] = board[x + 1][y] + 1;
                    }
                }
                if (
                    board[x - 1] !== undefined &&
                    board[x - 1][y] !== undefined
                ) {
                    // x снизу у на месте
                    if (board[x - 1] && board[x - 1][y] !== 'x') {
                        board[x - 1][y] = board[x - 1][y] + 1;
                    }
                }
                if (
                    board[x - 1] !== undefined &&
                    board[x - 1][y - 1] !== undefined
                ) {
                    // x снизу у слева
                    if (board[x - 1] && board[x - 1][y - 1] !== 'x') {
                        board[x - 1][y - 1] = board[x - 1][y - 1] + 1;
                    }
                }
                if (
                    board[x - 1] !== undefined &&
                    board[x - 1][y + 1] !== undefined
                ) {
                    // x снизу у справа
                    if (board[x - 1] && board[x - 1][y + 1] !== 'x') {
                        board[x - 1][y + 1] = board[x - 1][y + 1] + 1;
                    }
                }
                if (
                    board[x + 1] !== undefined &&
                    board[x + 1][y + 1] !== undefined
                ) {
                    // x сверху у справа
                    if (board[x + 1] && board[x + 1][y + 1] !== 'x') {
                        board[x + 1][y + 1] = board[x + 1][y + 1] + 1;
                    }
                }
                if (
                    board[x + 1] !== undefined &&
                    board[x + 1][y - 1] !== undefined
                ) {
                    // x сверху у слева
                    if (board[x + 1] && board[x + 1][y - 1] !== 'x') {
                        board[x + 1][y - 1] = board[x + 1][y - 1] + 1;
                    }
                }
            }
        }
    }
    for (let x = 0; x < height; x++) {
        for (let y = 0; y < width; y++) {
            board[x][y] = {
                value: board[x][y],
                position: { x, y },
                isRevealed: false,
                isFlagged: false,
                isMine: board[x][y] === 'x' ? true : false,
            };
        }
    }
    return {
        type: types.CREATE_BOARD,
        payload: { board, flags },
    };
};

export const createNewGame = () => {
    return {
        type: types.CREATE_NEW_GAME,
    };
};

export const cellToggleStatus = (board, cell, mines) => {
    const { x, y } = cell.position;
    if (cell.isFlagged) {
        return cellToggleFlagged(board, cell, mines);
    }
    if (cell.isMine) {
        return cellToggleMine(board, cell);
    }
    if (cell.value === 0) {
        return cellToggleEpmty(board, x, y, mines);
    }
    if (!cell.isMine && cell.value !== 0) {
        return cellToggleRevealed(board, cell, x, y, mines);
    }
};

export const cellToggleFlagged = (board, cell, mines, flags) => {
    const { x, y } = cell.position;
    let counterFlaggs = flags;
    let newBoard = [].concat(board);
    if (counterFlaggs >= 0 && cell.isFlagged) {
        newBoard[x][y] = {
            ...cell,
            isFlagged: false,
        };
        counterFlaggs = flags + 1;
    }
    if (counterFlaggs !== 0 && !cell.isFlagged) {
        newBoard[x][y] = {
            ...cell,
            isFlagged: true,
        };
        counterFlaggs = flags - 1;
    }
    return (dispatch) => {
        dispatch(counterCell(newBoard, mines));
        dispatch({
            type: types.CELL_STATUS_FLAGGED,
            payload: { newBoard, counterFlaggs },
        });
    };
};
function cellToggleRevealed(board, cell, x, y, mines) {
    let newBoard = [].concat(board);
    newBoard[x][y] = {
        ...cell,
        isRevealed: true,
    };
    return (dispatch) => {
        dispatch(counterCell(newBoard, mines));
        dispatch({
            type: types.CELL_STATUS_REVEALED,
            payload: newBoard,
        });
    };
}

function cellToggleMine(board, cell) {
    const { x, y } = cell.position;
    let newBoard = [].concat(board).map((row) => {
        return row.map((cell) => {
            if (cell.isMine) {
                cell.isRevealed = true;
            }
            if (cell.isFlagged) {
                cell.value = 'x-wrong';
            }
            return cell;
        });
    });
    newBoard[x][y] = {
        ...cell,
        isRevealed: true,
        exploded: true,
    };
    return (dispatch) => {
        dispatch({
            type: types.CELL_STATUS_MINE,
            payload: newBoard,
        });
        dispatch(statusGameLose());
    };
}

function cellToggleEpmty(board, x, y, mines) {
    let newBoard = [].concat(board);

    let checkedRevealedArr = [];

    checkedRevealedArr.push(newBoard[x][y]);

    while (checkedRevealedArr.length !== 0) {
        let cell = checkedRevealedArr.pop();
        let i = cell.position.x;
        let j = cell.position.y;

        if (!cell.isRevealed) {
            cell.isRevealed = true;
        }
        if (cell.value !== 0) {
            break;
        }

        // сверху слева

        if (
            i > 0 &&
            j > 0 &&
            newBoard[i - 1][j - 1].value === 0 &&
            !newBoard[i - 1][j - 1].isRevealed
        ) {
            checkedRevealedArr.push(newBoard[i - 1][j - 1]);
        }

        // снизу справа

        if (
            i < newBoard.length - 1 &&
            j < newBoard[0].length - 1 &&
            newBoard[i + 1][j + 1].value === 0 &&
            !newBoard[i + 1][j + 1].isRevealed
        ) {
            checkedRevealedArr.push(newBoard[i + 1][j + 1]);
        }

        // сверху справа

        if (
            i > 0 &&
            j < newBoard[0].length - 1 &&
            newBoard[i - 1][j + 1].value === 0 &&
            !newBoard[i - 1][j + 1].isRevealed
        ) {
            checkedRevealedArr.push(newBoard[i - 1][j + 1]);
        }

        // снизу слева

        if (
            i < newBoard.length - 1 &&
            j > 0 &&
            newBoard[i + 1][j - 1].value === 0 &&
            !newBoard[i + 1][j - 1].isRevealed
        ) {
            checkedRevealedArr.push(newBoard[i + 1][j - 1]);
        }

        // сверху
        if (
            i > 0 &&
            newBoard[i - 1][j].value === 0 &&
            !newBoard[i - 1][j].isRevealed
        ) {
            checkedRevealedArr.push(newBoard[i - 1][j]);
        }

        // справа

        if (
            j < newBoard[0].length - 1 &&
            newBoard[i][j + 1].value === 0 &&
            !newBoard[i][j + 1].isRevealed
        ) {
            checkedRevealedArr.push(newBoard[i][j + 1]);
        }

        // снизу

        if (
            i < newBoard.length - 1 &&
            newBoard[i + 1][j].value === 0 &&
            !newBoard[i + 1][j].isRevealed
        ) {
            checkedRevealedArr.push(newBoard[i + 1][j]);
        }

        // слева

        if (
            j > 0 &&
            newBoard[i][j - 1].value === 0 &&
            !newBoard[i][j - 1].isRevealed
        ) {
            checkedRevealedArr.push(newBoard[i][j - 1]);
        }

        // открытие рядом стоящих

        if (i > 0 && j > 0 && !newBoard[i - 1][j - 1].isRevealed) {
            //сверху слева

            newBoard[i - 1][j - 1].isRevealed = true;
        }

        if (j > 0 && !newBoard[i][j - 1].isRevealed) {
            // слева
            newBoard[i][j - 1].isRevealed = true;
        }

        if (
            i < newBoard.length - 1 &&
            j > 0 &&
            !newBoard[i + 1][j - 1].isRevealed
        ) {
            //снизу слева
            newBoard[i + 1][j - 1].isRevealed = true;
        }

        if (i > 0 && !newBoard[i - 1][j].isRevealed) {
            //сверху
            newBoard[i - 1][j].isRevealed = true;
        }

        if (i < newBoard.length - 1 && !newBoard[i + 1][j].isRevealed) {
            // снизу
            newBoard[i + 1][j].isRevealed = true;
        }

        if (
            i > 0 &&
            j < newBoard[0].length - 1 &&
            !newBoard[i - 1][j + 1].isRevealed
        ) {
            // сверху справа
            newBoard[i - 1][j + 1].isRevealed = true;
        }

        if (j < newBoard[0].length - 1 && !newBoard[i][j + 1].isRevealed) {
            //справа
            newBoard[i][j + 1].isRevealed = true;
        }

        if (
            i < newBoard.length - 1 &&
            j < newBoard[0].length - 1 &&
            !newBoard[i + 1][j + 1].isRevealed
        ) {
            // снизу
            newBoard[i + 1][j + 1].isRevealed = true;
        }
    }

    return (dispatch) => {
        dispatch(counterCell(newBoard, mines));
        dispatch({
            type: types.CELL_STATUS_EMPTY,
            payload: newBoard,
        });
    };
}

export const startGame = () => {
    return {
        type: types.START_GAME,
    };
};

export const counterCell = (board, mines) => {
    const counterRelevead = board
        .map((row) => row.filter((item) => item.isRevealed).length)
        .reduce((acc, curr) => acc + curr);

    const counterNotMines = board
        .map((row) => row.filter((item) => !item.isMine).length)
        .reduce((acc, curr) => acc + curr);

    if (counterRelevead === counterNotMines) {
        return statusGameWin();
    }

    return {
        type: types.COUNTER_CELL,
        payload: counterRelevead,
    };
};

export const statusGameWin = () => {
    return {
        type: types.STATUS_GAME_WIN,
    };
};

export const statusGameLose = () => {
    return {
        type: types.STATUS_GAME_LOSE,
    };
};
