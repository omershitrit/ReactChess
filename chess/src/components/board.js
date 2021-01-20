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
            whitePlayer: [],
            whiteDirection: -1,
            blackPlayer: [],
            turn: "W",
            selectedTile: undefined,
            targetTiles: []
        };
    }

    componentDidMount = () => this.initiateBoard();

    generatePiece = (description) => {
        const { piece, color, position, firstMove } = description;
        if (piece === "P") {
            const direction = (color === "W" ? this.state.whiteDirection : this.state.whiteDirection * -1);
            return <Pawn color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={firstMove} direction={direction} />
        }
        else if (piece === "B") { return <Bishop color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
        else if (piece === "K") { return <King color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={firstMove} /> }
        else if (piece === "N") { return <Knight color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
        else if (piece === "Q") { return <Queen color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} /> }
        else if (piece === "R") { return <Rook color={color} position={position} getTiles={this.getTiles} highlightTiles={this.highlightTiles} firstMove={true} /> }
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
            this.state.targetTiles.forEach(pos => arr[pos].highlight = false);
            positions.forEach(pos => arr[pos].highlight = !arr[pos].highlight);
            this.setState({ tiles: arr, targetTiles: positions });
        }
    }

    tileClicked = (index) => {
        if (this.state.tiles[index].color !== undefined && this.state.tiles[index].color !== this.state.turn) {
            // used for avoiding a color change bug
        } else {
            this.state.targetTiles.some(t => t === index) && this.executeMove(this.state.selectedTile, index);
            this.setState({ selectedTile: index });
        }
    }

    executeMove = (src, dst) => {
        let tiles = this.state.tiles;
        console.log("executing! ...")
        this.setState({ tiles: [] }, () => {
            if (tiles[dst].occupied) {
                if (tiles[dst].piece === "K") {
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
            if (tiles[dst].piece === "P" || tiles[dst].piece === "R" || tiles[dst].piece === "K") {
                tiles[dst].firstMove = false;
            }
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

        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B", highlight: false, firstMove: true });

        // fill in empty tiles
        for (; index < NUM_TILES - 16; ++index) {
            //arr.push(<Tile key={index} index={index} row={Math.floor(index / 8)} />);
            arr.push({ position: index, row: Math.floor(index / 8), occupied: false, piece: undefined, color: undefined });
        }

        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W", highlight: false, firstMove: true });

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
        const temp = this.state.tiles.map((t, key) => <Tile key={key} index={t.position} row={t.row} piece={this.generatePiece(t, this.getTiles, this.highlightTiles)} highlight={t.highlight} tileClicked={this.tileClicked} />);
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