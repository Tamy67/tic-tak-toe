import React, { useEffect, useState } from 'react';
import Board from './Board';
import { BoardState, CellValue } from '../models/types';
import { initializeBoard, checkWinner } from '../utils/gameLogic';
import { saveGameToStorage } from '../utils/storage';

const getGameStateFromStorage = () => {
    const gameStateFromStorage = window.localStorage.getItem('gameState');
    if (gameStateFromStorage) {
        return JSON.parse(gameStateFromStorage);
    }
    return {
        board: initializeBoard(3),
        player: 'X',
        winner: null,
        winningLine: null,
        isDraw: false,
    };
};

const Game: React.FC = () => {
    const [board, setBoard] = useState<BoardState>(
        () => getGameStateFromStorage().board
    );
    const [currentPlayer, setCurrentPlayer] = useState<CellValue>(
        () => getGameStateFromStorage().player
    );
    const [winner, setWinner] = useState<CellValue | null>(
        () => getGameStateFromStorage().winner
    );
    const [winningLine, setWinningLine] = useState<number[] | null>(
        () => getGameStateFromStorage().winningLine
    );
    const [isDraw, setIsDraw] = useState<boolean>(
        () => getGameStateFromStorage().isDraw
    );

    useEffect(() => {
        // Fonction qui sauvegarde l'état du jeu dans le localStorage
        const saveGameState = () => {
            saveGameToStorage({
                board,
                player: currentPlayer,
                winningLine,
                isDraw,
            });
        };

        // Appel de la fonction de sauvegarde lorsqu'il y a un changement d'état dans le jeu
        saveGameState();
    }, [board, currentPlayer, winningLine, isDraw]);

    // Gérer le clic sur une cellule du tableau
    const handleBoardClick = (newBoard: BoardState, newPlayer: CellValue) => {
        if (winner || isDraw) return;
        setBoard(newBoard);

        const winnerInfo = checkWinner(newBoard);

        if (winnerInfo) {
            setWinner(winnerInfo.winner);
            setWinningLine(winnerInfo.line);
        } else {
            setCurrentPlayer(newPlayer);
            const allCellsFilled = newBoard
                .flat()
                .every((cell) => cell !== null);
            if (allCellsFilled) {
                setIsDraw(true);
            }
        }
    };

    const resetBoardState = () => {
        setWinningLine(null);
    };

    const resetGame = () => {
        setBoard(initializeBoard(3));
        setCurrentPlayer('X');
        setWinner(null);
        setIsDraw(false);
        resetBoardState();
    };

    const gameResult = winner
        ? `Le gagnant est : ${winner}`
        : isDraw
        ? 'Match nul'
        : `Tour de : ${currentPlayer}`;

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold text-blue-950 underline mb-5'>
                Tic-Tac-Toe
            </h1>
            <h2 className='text-xl font-medium text-blue-950 mb-5'>
                {gameResult}
            </h2>

            <Board
                board={board}
                onBoardClick={handleBoardClick}
                currentPlayer={currentPlayer}
                winningLine={winningLine}
            />

            <button
                type='button'
                className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6'
                onClick={resetGame}
            >
                Réinitialiser
            </button>
        </div>
    );
};

export default Game;
