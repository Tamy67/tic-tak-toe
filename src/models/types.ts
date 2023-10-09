// Une cellule peut être soit null (vide), soit contient 'X' ou 'O'.
export type CellValue = 'X' | 'O' | null;

// Le plateau est une matrice 2D de CellValue.
export type BoardState = CellValue[][];

// Un joueur peut être 'X' ou 'O'.
export type Player = 'X' | 'O';
