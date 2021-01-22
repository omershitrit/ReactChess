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

const implementMove = (src, dst, tiles) => {
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
    const tiles = deepCopy(tiles2);
    let max = -10000;
    let i = -1;
    let j = -1;
    tiles.forEach((t, index) => {
        if (t.color === "B") {
            const moves = calculatePossibleMoves(index, tiles);
            moves.forEach(move => {
                let res = implementMove(index, move, tiles)
                const currentValue = res.value + min(res.tiles, depth - 1, "W")
                if (currentValue > max) {
                    i = index;
                    j = move;
                    max = currentValue;
                    console.log("src: " + i + ", dst: " + j + " put me with: " + max)
                }
            });
        }
    });
    let res = { src: i, dst: j };
    if (res.src === -1 && res.dst === -1) { res = pickRandomly(tiles); }
    return res;
    return { src: i, dst: j };

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
    if (depth == 0) { return evalutateBoard("B", "W", tiles); }
    let lowestValue = 10000;
    const possibleMoves = tiles.filter(t => t.color === turn).map((t, i) => calculatePossibleMoves(i, tiles)).filter(moves => moves.length > 0);
    possibleMoves.forEach((moves, src) => {
        moves.forEach(move => {
            let res = implementMove(src, move, tiles)
            const currentValue = res.value + max(res.tiles, depth - 1, "B");
            if (currentValue <= lowestValue) {
                lowestValue = currentValue;
            }
        })
    });
    return lowestValue;
}

const max = (tiles, depth, turn) => {
    if (depth == 0) { return evalutateBoard("B", "W", tiles); }
    let highestValue = -10000;
    const possibleMoves = tiles.filter(t => t.color === turn).map((t, i) => calculatePossibleMoves(i, tiles))
    console.log("possibleMobes: ", possibleMoves)
    possibleMoves.forEach((moves, src) => {
        moves.forEach(move => {
            let res = implementMove(src, move, tiles)
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
    const p1 = tiles.filter(t => t.color === c1).map(t => convertToPoint(t.piece)).reduce((a, b) => a + b, 0);
    const p2 = tiles.filter(t => t.color === c2).map(t => convertToPoint(t.piece)).reduce((a, b) => a + b, 0);
    console.log("c1: " + tiles.filter(t => t.color === c1))
    console.log("c2: " + tiles.filter(t => t.color === c2))
    console.log("p1: " + p1 + ", p2: " + p2)
    return p2 - p1;
}

export default executeAIMove;