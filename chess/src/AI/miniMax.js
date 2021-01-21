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
    /*if (tiles[dst].piece === "K") {
        const color = tiles[dst].piece.color === "W" ? "Black" : "White";
        alert(color + " wins!")
    }*/

    if (tiles[dst].piece !== undefined) {
        value = convertToPoint(tiles[dst].piece);
    }
    tiles[dst].piece = tiles[src].piece;
    tiles[dst].occupied = true;
    tiles[dst].highlight = false;
    tiles[dst].color = tiles[src].color;
    tiles[src].occupied = false;
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
    //console.log("Blacks: ", tiles.filter(t => t.color === "B"))
    const possibleMoves = tiles.filter(t => t.color === "B").map((t, i) => calculatePossibleMoves(i, tiles));
    let max = -10000;
    let i = 0;
    let j = 0;
    possibleMoves.forEach((moves, src) => {
        moves.forEach(move => {
            let res = implementMove(src, move, tiles)
            const currentValue = res.value + min(res.tiles, depth - 1)
            if (currentValue > max) {
                i = src;
                j = move;
                max = currentValue;
            }
        });
    });
    //console.log("Blacks: ", tiles.filter(t => t.color === "B"))
    return { src: i, dst: j };

}


const min = (tiles, depth) => {
    // or game over
    if (depth == 0) { return; }
    let lowestValue = 10000;
    const possibleMoves = tiles.filter(t => t.color === "B").map((t, i) => calculatePossibleMoves(i, tiles)).filter(moves => moves.length > 0);
    possibleMoves.forEach((moves, src) => {
        moves.forEach(move => {
            let { newTiles, value } = implementMove(src, move, tiles)
            const currentValue = value + max(newTiles, depth - 1);
            if (currentValue >= lowestValue) {
                lowestValue = currentValue;
            }
        })
    });
    return lowestValue;
}

const max = (tiles, depth) => {
    // or game over
    if (depth == 0) { return; }
    let highestValue = -10000;
    const possibleMoves = tiles.filter(t => t.color === "B").map((t, i) => calculatePossibleMoves(i, tiles)).filter(moves => moves.length > 0);
    possibleMoves.forEach((moves, src) => {
        moves.forEach(move => {
            let { newTiles, value } = implementMove(src, move, tiles)
            const currentValue = value + min(newTiles, depth - 1);
            if (currentValue >= highestValue) {
                highestValue = currentValue;
            }
        })
    });
    return highestValue;
}

export default executeAIMove;