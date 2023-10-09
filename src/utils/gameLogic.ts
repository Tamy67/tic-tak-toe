import { BoardState, CellValue, Player } from '../models/types';

// Initialiser le plateau de jeu
export const initializeBoard = (size: number): CellValue[][] => {
    return Array.from({ length: size }, () => Array(size).fill(null));
};

export type GameResult = {
    winner: Player;
    line: number[];
};

export const checkWinner = (board: BoardState): GameResult | null => {
    // Vérifier les lignes
    for (let row = 0; row < board.length; row++) {
        if (
            board[row][0] &&
            board[row][0] === board[row][1] &&
            board[row][0] === board[row][2]
        ) {
            return {
                winner: board[row][0] as 'X' | 'O',
                line: [row * 3, row * 3 + 1, row * 3 + 2],
            };
        }
    }

    // Vérifier les colonnes
    for (let col = 0; col < board[0].length; col++) {
        if (
            board[0][col] &&
            board[0][col] === board[1][col] &&
            board[0][col] === board[2][col]
        ) {
            return {
                winner: board[0][col] as 'X' | 'O',
                line: [col, col + 3, col + 6],
            };
        }
    }

    // Vérifier les diagonales
    if (
        board[0][0] &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]
    ) {
        return { winner: board[0][0] as 'X' | 'O', line: [0, 4, 8] };
    }
    if (
        board[0][2] &&
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0]
    ) {
        return { winner: board[0][2] as 'X' | 'O', line: [2, 4, 6] };
    }

    return null;
};

// Tour du joueur suivant
export const nextPlayer = (currentPlayer: CellValue): CellValue => {
    return currentPlayer === 'X' ? 'O' : 'X';
};

// Jouer un tour
export const makeMove = (
    board: CellValue[][],
    row: number,
    col: number,
    player: CellValue
): CellValue[][] => {
    if (board[row][col] === null) {
        board[row][col] = player;
    }
    return board;
};
