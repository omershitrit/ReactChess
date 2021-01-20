


const CHECK_BONUS = 50;
const CHECK_MATE_BONUS = 10000;
const DEPTH_BONUS = 100;
const CASTLED_BONUS = 60;


const executeAIMove = getTiles => {
    const tiles = getTiles();
    const highestValue = 10000;
    const lowestValue = -10000;
    let res = -1;
    const possibleMoves = tiles.map(t => t.piece !== undefined ? t.piece : undefined);
    console.log("possibleMoves: ");
}

export default executeAIMove;