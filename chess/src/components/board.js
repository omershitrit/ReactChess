import React from 'react';
import Tile from './tile.js';
import Pawn from './pieces/pawn.js';
import Rook from './pieces/rook.js';
import Knight from './pieces/knight.js';
import Bishop from './pieces/bishop.js';
import King from './pieces/king.js';
import Queen from './pieces/queen.js';
import executeAIMove from '../AI/miniMax.js';
import './board.css';

const NUM_TILES = 64;

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            whitePlayer: "player",
            whiteDirection: -1,
            blackPlayer: props.mode,
            turn: "W",
            selectedTile: undefined,
            targetTiles: []
        };
    }

    componentDidMount = () => this.initiateBoard();

    componentDidUpdate = () => {
        this.state.blackPlayer === "computer" && this.state.turn === "B" && executeAIMove(this.getTiles);
    }

    generatePiece = (pos, description) => {
        const position = pos;
        const { piece, color, firstMove } = description;
        if (piece === Pawn) {
            const direction = (color === "W" ? this.state.whiteDirection : this.state.whiteDirection * -1);
            return <Pawn color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={firstMove} direction={direction} />
        }
        else if (piece === Bishop) { return <Bishop color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
        else if (piece === King) { return <King color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={firstMove} /> }
        else if (piece === Knight) { return <Knight color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
        else if (piece === Queen) { return <Queen color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
        else if (piece === Rook) { return <Rook color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={true} /> }
    }

    generateBoard = tiles => {
        let res = [];
        const ROW_SIZE = 8;
        for (let i = 0; i < NUM_TILES; i += ROW_SIZE) {
            let row = tiles.slice(i, i + ROW_SIZE);
            res.push(row);
        }
        return res;
    }

    //generateTile = (t) => <Tile index={t.position} row={t.row} piece={createPiece(t)} highlight={t.highlight} tileClicked={this.tileClicked} />

    highlightTiles = (positions, color) => {
        if (this.state.turn === color) {
            let arr = this.state.tiles;
            console.log(arr)
            this.state.targetTiles.forEach(pos => arr[pos].highlight = false);
            positions.forEach(pos => arr[pos].highlight = !arr[pos].highlight);
            this.setState({ tiles: arr, targetTiles: positions });
        }
    }

    tileClicked = (index) => {
        this.state.targetTiles.some(t => t === index) && this.executeMove(this.state.selectedTile, index);
        this.setState({ selectedTile: index });
    }

    executeMove = (src, dst) => {
        let tiles = this.state.tiles;
        this.setState({ tiles: [] }, () => {
            if (tiles[dst].occupied) {
                if (tiles[dst].piece === King) {
                    const color = tiles[dst].piece.color === "W" ? "Black" : "White";
                    alert(color + " wins!")
                }

                // add some bars in the sides showing the eaten pieces
            }
            tiles[dst].piece = tiles[src].piece;
            tiles[dst].occupied = true;
            tiles[dst].highlight = false;
            tiles[dst].color = this.state.turn;
            tiles[src].occupied = false;
            tiles[src].piece = undefined;
            // setting the firstMove flag to false so they wont be able to castle (Rook & King) or move major stepd (Pawn)
            if (tiles[dst].piece === Pawn || tiles[dst].piece === Rook || tiles[dst].piece === King) {
                tiles[dst].firstMove = false;
            }
            this.state.targetTiles.forEach(pos => tiles[pos].highlight = false);
            this.setState({ tiles: tiles, selectedTile: undefined, targetTiles: [], turn: this.state.turn === "W" ? "B" : "W" })
        });
    }

    initiateBoard = () => {
        let arr = [];
        arr.push({ piece: Rook, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Knight, color: "B", occupied: true, highlight: false });
        arr.push({ piece: Bishop, color: "B", occupied: true, highlight: false });
        arr.push({ piece: Queen, color: "B", occupied: true, highlight: false });
        arr.push({ piece: King, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Bishop, color: "B", occupied: true, highlight: false });
        arr.push({ piece: Knight, color: "B", occupied: true, highlight: false });
        arr.push({ piece: Rook, color: "B", occupied: true, highlight: false, firstMove: true });

        arr.push({ piece: Pawn, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "B", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "B", occupied: true, highlight: false, firstMove: true });

        // fill in empty tiles
        for (let i = 0; i < 32; ++i) {
            arr.push({ piece: undefined, color: undefined, occupied: false, });
        }

        arr.push({ piece: Pawn, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Pawn, color: "W", occupied: true, highlight: false, firstMove: true });

        arr.push({ piece: Rook, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Knight, color: "W", occupied: true, highlight: false });
        arr.push({ piece: Bishop, color: "W", occupied: true, highlight: false });
        arr.push({ piece: Queen, color: "W", occupied: true, highlight: false });
        arr.push({ piece: King, color: "W", occupied: true, highlight: false, firstMove: true });
        arr.push({ piece: Bishop, color: "W", occupied: true, highlight: false });
        arr.push({ piece: Knight, color: "W", occupied: true, highlight: false });
        arr.push({ piece: Rook, color: "W", occupied: true, highlight: false, firstMove: true });
        this.setState({ tiles: arr });
    }

    showTiles = () => {
        const tiles = this.state.tiles.map((t, i) => <Tile key={i} index={i} row={Math.floor(i / 8)} piece={this.generatePiece(i, t)} highlight={t.highlight} tileClicked={this.tileClicked} />);
        return this.generateBoard(tiles).map((row, index) => <div key={index} className="row">{row}</div>)
    }

    getTiles = () => this.state.tiles;

    render() {
        return (
            <div className="board">
                {this.showTiles()}
            </div>
        );
    }
}