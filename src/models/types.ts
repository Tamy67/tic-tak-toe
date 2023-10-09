// Une cellule peut être soit null (vide), soit contient 'X' ou 'O'.
export type CellValue = 'X' | 'O' | null;

// Le plateau est une matrice 2D de CellValue.
export type BoardState = CellValue[][];

export type Player = CellValue;
