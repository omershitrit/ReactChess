const PAWN_OFFSETS = [7, 8, 9, 16];
const ROOK_OFFSETS = [-8, -1, 1, 8];
const BISHOP_OFFSETS = [-9, -7, 7, 9];
const KNIGHT_OFFSETS = [-17, -15, -10, -6, 6, 10, 15, 17];
const KING_OFFSETS = [-9, -8, -7, -1, 1, 7, 8, 9];
const QUEEN_OFFSETS = [-9, -8, -7, -1, 1, 7, 8, 9];


const calculateMultipleSteps = (OFFSETS, position, tiles) => {
    const possibleMoves = [];
    OFFSETS.forEach(offset => {
        let tempPosition = position;
        while (tempPosition >= 0 && tempPosition <= 63) {
            if (isInEdge(tempPosition, offset, tiles[position].piece)) {
                break;
            }
            tempPosition += offset;
            if (tempPosition >= 0 && tempPosition <= 63) {
                if (!tiles[tempPosition].occupied) {
                    possibleMoves.push(tempPosition);
                } else {
                    if (tiles[tempPosition].color !== tiles[position].color) {
                        possibleMoves.push(tempPosition);
                    }
                    break;
                }
            }
        }
    })
    return possibleMoves;
}

const calculateOneStep = (OFFSETS, position, tiles) => {
    const possibleMoves = [];
    OFFSETS.forEach(offset => {
        let tempPosition = position;
        if (!isPieceInEdge(tempPosition, offset, tiles[position].piece)) {
            tempPosition += offset;
            if (tempPosition >= 0 && tempPosition <= 63) {
                if (!tiles[tempPosition].occupied) {
                    possibleMoves.push(tempPosition);
                } else {
                    if (tiles[tempPosition].color !== tiles[position].color) {
                        possibleMoves.push(tempPosition);
                    }
                }
            }
        }
    })
    return possibleMoves;
}

const calculatePossibleMoves = (src, tiles) => {
    const { piece, color } = tiles[src];
    if (piece === "P") {
        return calculatePawnMoves(src, tiles, color === "W" ? -1 : 1);
    }
    else if (piece === "R") { return calculateMultipleSteps(ROOK_OFFSETS, src, tiles); }
    else if (piece === "N") { return calculateOneStep(KNIGHT_OFFSETS, src, tiles, color); }
    else if (piece === "B") { return calculateMultipleSteps(BISHOP_OFFSETS, src, tiles, color); }
    else if (piece === "K") { return calculateOneStep(KING_OFFSETS, src, tiles, color); }
    else if (piece === "Q") { return calculateMultipleSteps(QUEEN_OFFSETS, src, tiles, color); }
    return [];
}

const calculatePawnMoves = (src, tiles, direction) => {
    let possibleMoves = [];
    PAWN_OFFSETS.forEach(offset => {
        const dst = src + direction * offset;
        if (offset === 16 && tiles[src].firstMove && !tiles[dst].occupied && !tiles[dst - direction * 8].occupied) {
            possibleMoves.push(dst);
        } else if (offset === 7 || offset === 9) {
            if (tiles[dst].occupied && tiles[dst].color !== tiles[src].color && !isPawnInEdge(src, offset)) {
                possibleMoves.push(dst);
            }
        } else if (offset === 8 && !tiles[dst].occupied) {
            possibleMoves.push(dst);
        }
    });
    return possibleMoves.filter(pos => pos >= 0 && pos <= 63);
}

// a function for Bishop, Rook, Queen
const isInEdge = (pos, offset, piece) => {
    if (piece === "R") {
        if ((pos - 7) % 8 === 0 && offset === 1) {
            return true;
        }
        if (pos % 8 === 0 && offset === -1) {
            return true;
        }
    } else if (piece === "B") {
        if (pos % 8 === 0 && (offset === -9 || offset === 7)) {
            return true;
        }
        if ((pos - 7) % 8 === 0 && (offset === -7 || offset === 9)) {
            return true;
        }
    } else if (piece === "Q") {
        if (pos % 8 === 0 && (offset === -9 || offset === -1 ||
            offset === 7)) {
            return true;
        }
        if ((pos - 7) % 8 === 0 && (offset === -7 || offset === 1 ||
            offset === 9)) {
            return true;
        }
    }
    return false;
}

const isPieceInEdge = (pos, offset, piece) => {
    if (piece === "N") {
        if (pos % 8 === 0 && (offset === -17 || offset === -10
            || offset === 6 || offset === 15)) {
            return true;
        }
        if ((pos - 1) % 8 === 0 && (offset === -10 || offset === 10 || offset === 6)) {
            return true;
        }
        if ((pos - 6) % 8 === 0 && (offset === -6 || offset === 10)) {
            return true;
        }
        if ((pos - 7) % 8 === 0 && (offset === -15 || offset === -6 || offset === 10 || offset === 17)) {
            return true;
        }
    } else if (piece === "K") {
        if (pos % 8 === 0 && (offset === -9 || offset === -1 ||
            offset === 7)) {
            return true;
        }
        if ((pos - 7) % 8 === 0 && (offset === -7 || offset === 1 ||
            offset === 9)) {
            return true;
        }
    }
    return false;
}

const isPawnInEdge = (pos, offset) => {
    if (pos % 8 === 0 && offset === 9) {
        return true;
    }
    if ((pos - 7) % 8 === 0 && offset === 7) {
        return true;
    }
    return false;
}




export default calculatePossibleMoves;