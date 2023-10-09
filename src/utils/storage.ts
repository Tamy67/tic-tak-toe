import { Player } from './../models/types';
import { BoardState } from '../models/types';

type GameToStorageProps = {
    board: BoardState;
    player: Player;
    winningLine: number[] | null;
    isDraw: boolean;
};

export const saveGameToStorage = ({
    board,
    player,
    winningLine,
    isDraw,
}: GameToStorageProps) => {
    const gameState = {
        board,
        player,
        winningLine,
        isDraw,
    };

    window.localStorage.setItem('gameState', JSON.stringify(gameState));
};

export const resetGameStorage = () => {
    window.localStorage.removeItem('gameState');
};
