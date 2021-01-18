import React from 'react';
import Tile from './tile.js';
import Pawn from './pieces/pawn.js';
import Rook from './pieces/rook.js';
import Knight from './pieces/knight.js';
import Bishop from './pieces/bishop.js';
import King from './pieces/king.js';
import Queen from './pieces/queen.js';
import './board.css';

const NUM_TILES = 64;

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            whitePlayer: undefined,
            whiteDirection: -1,
            blackPlayer: undefined,
            turn: "W",
            selectedTile: undefined,
            targetTiles: []
        };
    }

    componentDidMount = () => this.initiateBoard();

    generateBoard = tiles => {
        let res = [];
        const ROW_SIZE = 8;
        for (let i = 0; i < NUM_TILES; i += ROW_SIZE) {
            let row = tiles.slice(i, i + ROW_SIZE);
            res.push(row);
        }
        return res;
    }

    generatePiece = (t) => {
        const piece = t.piece;
        const color = t.color;
        const position = t.position;
        if (color === "W") {
            if (piece === "P") { return <Pawn color="W" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={true} direction={this.state.whiteDirection} /> }
            else if (piece === "B") { return <Bishop color="W" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
            else if (piece === "K") { return <King color="W" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
            else if (piece === "N") { return <Knight color="W" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
            else if (piece === "Q") { return <Queen color="W" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
            else if (piece === "R") { return <Rook color="W" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={true} /> }
        } else {
            if (piece === "P") { return <Pawn color="B" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={true} direction={this.state.whiteDirection * -1} /> }
            else if (piece === "B") { return <Bishop color="B" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
            else if (piece === "K") { return <King color="B" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
            else if (piece === "N") { return <Knight color="B" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
            else if (piece === "Q") { return <Queen color="B" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
            else if (piece === "R") { return <Rook color="B" position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={true} /> }
        }
    }

    generateTile = (t) => <Tile index={t.position} row={t.row} piece={this.generatePiece(t)} highlight={t.highlight} tileClicked={this.tileClicked} />

    highlightTiles = (positions, color) => {
        console.log("this.state.turn: ", this.state.turn);
        console.log("color: ", color);
        if (this.state.turn === color) {
            let arr = this.state.tiles;
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
            tiles[dst].piece = tiles[src].piece;
            tiles[dst].occupied = true;
            tiles[dst].highlight = false;
            tiles[dst].color = this.state.turn;
            tiles[src].occupied = false;
            tiles[src].piece = undefined;
            this.state.targetTiles.forEach(pos => tiles[pos].highlight = false);
            this.setState({ tiles: tiles, selectedTile: undefined, targetTiles: [], turn: this.state.turn === "W" ? "B" : "W" })
        });
    }

    initiateBoard = () => {
        let arr = [];
        let index = 0

        arr.push({ position: index++, row: 0, occupied: true, piece: "R", color: "B", highlight: false });
        arr.push({ position: index++, row: 0, occupied: true, piece: "N", color: "B", highlight: false });
        arr.push({ position: index++, row: 0, occupied: true, piece: "B", color: "B", highlight: false });
        arr.push({ position: index++, row: 0, occupied: true, piece: "Q", color: "B", highlight: false });
        arr.push({ position: index++, row: 0, occupied: true, piece: "K", color: "B", highlight: false });
        arr.push({ position: index++, row: 0, occupied: true, piece: "B", color: "B", highlight: false });
        arr.push({ position: index++, row: 0, occupied: true, piece: "N", color: "B", highlight: false });
        arr.push({ position: index++, row: 0, occupied: true, piece: "R", color: "B", highlight: false });

        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false });

        // fill in empty tiles
        for (; index < NUM_TILES - 16; ++index) {
            //arr.push(<Tile key={index} index={index} row={Math.floor(index / 8)} />);
            arr.push({ position: index, row: Math.floor(index / 8), occupied: false, piece: undefined, color: undefined });
        }

        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false });

        arr.push({ position: index++, row: 7, occupied: true, piece: "R", color: "W", highlight: false });
        arr.push({ position: index++, row: 7, occupied: true, piece: "N", color: "W", highlight: false });
        arr.push({ position: index++, row: 7, occupied: true, piece: "B", color: "W", highlight: false });
        arr.push({ position: index++, row: 7, occupied: true, piece: "Q", color: "W", highlight: false });
        arr.push({ position: index++, row: 7, occupied: true, piece: "K", color: "W", highlight: false });
        arr.push({ position: index++, row: 7, occupied: true, piece: "B", color: "W", highlight: false });
        arr.push({ position: index++, row: 7, occupied: true, piece: "N", color: "W", highlight: false });
        arr.push({ position: index++, row: 7, occupied: true, piece: "R", color: "W", highlight: false });
        this.setState({ tiles: arr });
    }

    showTiles = () => {
        const temp = this.state.tiles.map((t, key) => <Tile key={key} index={t.position} row={t.row} piece={this.generatePiece(t)} highlight={t.highlight} tileClicked={this.tileClicked} />);
        return this.generateBoard(temp).map((row, index) => <div key={index} className="row">{row}</div>)
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