import React from 'react';
import Cell from './Cell';
import { BoardState, CellValue } from '../models/types';
import { makeMove, nextPlayer } from '../utils/gameLogic';

type BoardProps = {
    board: BoardState;
    onBoardClick: (newBoard: BoardState, newPlayer: CellValue) => void;
    currentPlayer: CellValue;
    winningLine: number[] | null;
};

const Board: React.FC<BoardProps> = ({
    board,
    onBoardClick,
    currentPlayer,
    winningLine,
}) => {
    const handleCellClick = (row: number, col: number) => {
        if (board[row][col] === null) {
            const newBoard = makeMove([...board], row, col, currentPlayer);
            onBoardClick(newBoard, nextPlayer(currentPlayer));
        }
    };

    return (
        <div className='flex flex-col items-center'>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className='flex'>
                    {row.map((cell, colIndex) => {
                        const isWinningCell = winningLine?.includes(
                            rowIndex * 3 + colIndex
                        );
                        return (
                            <Cell
                                key={colIndex}
                                value={cell}
                                isWinningCell={isWinningCell}
                                onClick={() =>
                                    handleCellClick(rowIndex, colIndex)
                                }
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Board;
