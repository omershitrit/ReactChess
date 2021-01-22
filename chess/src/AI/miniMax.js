import calculatePossibleMoves from '../components/pieces/movesFactory.js';

const CHECK_BONUS = 50;
const CHECK_MATE_BONUS = 10000;
const DEPTH_BONUS = 100;
const CASTLED_BONUS = 60;

const convertToPoint = piece => {
    switch (piece) {
        case "P":
            return 100;
        case "R":
            return 300;
        case "N":
            return 250;
        case "B":
            return 300;
        case "Q":
            return 1000;
        case "K":
            return 10000;
    }
}

const implementMove = (move, tiles) => {
    const { src, dst } = move;
    let value = 0;
    if (tiles[dst].piece !== undefined && tiles[dst].color !== tiles[src].color && tiles[dst].color !== undefined) {
        console.log("can eat: " + tiles[dst].piece + " if i move from: " + src + " to: " + dst)
        value = convertToPoint(tiles[dst].piece);
    }
    tiles[dst].piece = tiles[src].piece;
    tiles[dst].highlight = false;
    tiles[dst].color = tiles[src].color;
    tiles[src].piece = undefined;
    tiles[src].color = undefined;
    // setting the firstMove flag to false so they wont be able to castle (Rook & King) or move major stepd (Pawn)
    if (tiles[dst].piece === "P" || tiles[dst].piece === "R" || tiles[dst].piece === "K") {
        tiles[dst].firstMove = false;
    }
    //this.state.targetTiles.forEach(pos => tiles[pos].highlight = false);
    return { tiles: tiles, value: value };//, log: src + "to: " + dst + '\n' };
}

const deepCopy = arr => {
    return JSON.parse(JSON.stringify(arr))
}

const executeAIMove = (tiles2, depth) => {
    let tiles = deepCopy(tiles2);
    let max = -10000;
    let bestMove = {};
    const save = deepCopy(tiles);
    const possibleMoves = tiles.filter(t => t.color === "B").map(t => calculatePossibleMoves(t.position, tiles)).filter(moves => moves.length > 0);
    possibleMoves.forEach(moves => {
        moves.forEach(move => {
            tiles = save;
            let res = implementMove(move, tiles)
            const currentValue = res.value + min(res.tiles, depth - 1, "W")
            if (currentValue > max) {
                bestMove = move;
                max = currentValue;
                console.log("bestMove put me with: " + max)
            }
        });
    })
    if (bestMove.src === -1 && bestMove.dst === -1) {
        bestMove = pickRandomly(tiles);
    } else {
        return bestMove;
    }
}

const pickRandomly = possibleMoves => {
    let candidates = [];
    possibleMoves.forEach((moves, index) => {
        moves.length > 0 && candidates.push({ index: index, moves: moves });
    });
    const candidate = candidates[Math.floor(Math.random() * candidates.length)];
    const dst = candidate.moves[Math.floor(Math.random() * candidate.moves.length)];
    return { src: candidate.index, dst: dst };
}

const min = (tiles, depth, turn) => {
    if (depth == 0) { return evalutateBoard(turn, turn === "B" ? "W" : "B", tiles); }
    let lowestValue = 10000;
    const save = deepCopy(tiles);
    const possibleMoves = tiles.filter(t => t.color === turn).map((t, i) => calculatePossibleMoves(i, tiles)).filter(moves => moves.length > 0);
    possibleMoves.forEach(moves => {
        moves.forEach(move => {
            tiles = save;
            let res = implementMove(move, tiles)
            const currentValue = res.value + max(res.tiles, depth - 1, "B");
            if (currentValue <= lowestValue) {
                lowestValue = currentValue;
            }
        })
    });
    return lowestValue;
}

const max = (tiles, depth, turn) => {
    if (depth == 0) { return evalutateBoard(turn, turn === "B" ? "W" : "B", tiles); }
    let highestValue = -10000;
    const save = deepCopy(tiles)
    const possibleMoves = tiles.filter(t => t.color === turn).map((t, i) => calculatePossibleMoves(i, tiles))
    possibleMoves.forEach(moves => {
        moves.forEach(move => {
            tiles = save;
            let res = implementMove(move, tiles)
            const currentValue = res.value + min(res.tiles, depth - 1);
            if (currentValue >= highestValue) {
                highestValue = currentValue;
            }
        })
    });
    return highestValue;
}

const evalutateBoard = (c1, c2, tiles) => {
    return 0;
    console.log(tiles)
    const p1 = tiles.filter(t => t.color === c1).map(t => convertToPoint(t.piece)).reduce((a, b) => a + b, 0);
    const p2 = tiles.filter(t => t.color === c2).map(t => convertToPoint(t.piece)).reduce((a, b) => a + b, 0);
    console.log(p1)
    console.log(p2)
    return p2 - p1;
}

export default executeAIMove;