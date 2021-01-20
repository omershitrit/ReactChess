import Bishop from "./bishop";
import Queen from "./queen";

const PAWN_OFFSETS = [7, 8, 9, 16];
const ROOK_OFFSETS = [];
const BISHOP_OFFSETS = [];
const KNIGHT_OFFSETS = [];
const KING_OFFSETS = [];
const QUEEN_OFFSETS = [];


const calculateMultipleSteps = (piece, position, tiles) => {

}

const calculateOneStep = (piece, position, tiles) => {

}


const calculatePossibleMoves = (piece, position, tiles) => {
    if (piece === Pawn) { return calculatePawnMoves(PAWN_OFFSETS, position, tiles); }
    else if (piece === Rook) { return calculateMultipleSteps(ROOK_OFFSETS, position, tiles); }
    else if (piece === Knight) { return calculateOneStep(KNIGHT_OFFSETS, position, tiles); }
    else if (piece === Bishop) { return calculateMultipleSteps(BISHOP_OFFSETS, position, tiles); }
    else if (piece === King) { return calculateOneStep(KING_OFFSETS, position, tiles); }
    else if (piece === QUEEN_OFFSETS) { return calculateMultipleSteps(QUEEN_OFFSETS, position, tiles); }
}

export default calculatePossibleMoves;