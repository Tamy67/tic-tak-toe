import React from 'react';
import { CellValue } from '../models/types';

type CellProps = {
    value: CellValue;
    onClick: () => void;
    isWinningCell?: boolean;
};

const Cell: React.FC<CellProps> = ({ value, onClick, isWinningCell }) => {
    return (
        <button
            className={`w-24 h-24 border m-1 rounded text-lg text-white font-bold ${
                isWinningCell
                    ? 'bg-blue-700'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-500'
            }`}
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Cell;
