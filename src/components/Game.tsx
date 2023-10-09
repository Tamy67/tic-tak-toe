import React, { useState } from 'react';
import Board from './Board';
import { BoardState, CellValue } from '../models/types';
import { initializeBoard, checkWinner } from '../utils/gameLogic';

const Game: React.FC = () => {
    const [board, setBoard] = useState<BoardState>(initializeBoard(3)); // État pour le plateau de jeu
    const [currentPlayer, setCurrentPlayer] = useState<CellValue>('X'); // État pour le joueur actuel
    const [winner, setWinner] = useState<CellValue | null>(null); // État pour le gagnant
    const [winningLine, setWinningLine] = useState<number[] | null>(null);
    const [isDraw, setIsDraw] = useState(false);

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

    return (
        <div className='flex flex-col items-center'>
            <h1 className='text-3xl font-bold text-blue-950 underline mb-5'>
                Tic-Tac-Toe
            </h1>
            <h2 className='text-xl font-medium text-blue-950 mb-5'>
                {winner
                    ? `Le gagnant est : ${winner}`
                    : isDraw
                    ? 'Match nul'
                    : `Tour de : ${currentPlayer}`}
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
