import React from 'react';
import Tile from './tile.js';
//import Piece from './pieces/piece.js';
import executeAIMove from '../AI/miniMax.js';
import calculatePossibleMoves from './pieces/movesFactory.js';
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
            targetTiles: [],
            freeze: false
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

    highlightTiles = (moves) => {
        let arr = this.state.tiles;
        this.state.targetTiles.forEach(pos => arr[pos.dst].highlight = false);
        moves.forEach(pos => arr[pos.dst].highlight = !arr[pos.dst].highlight);
        this.setState({ tiles: arr, targetTiles: moves });
    }

    tileClicked = (index) => {
        const tiles = this.state.tiles;
        if (!this.state.freeze && this.state.turn === tiles[index].color) {
            console.log("calculating moves for: " + index)
            const possibleMoves = calculatePossibleMoves(index, tiles)
            this.highlightTiles(possibleMoves)
            this.setState({ selectedTile: index });
        } else if (this.state.targetTiles.some(t => t.dst === index)) {
            console.log("executing move: " + "src: " + this.state.selectedTile + ", dst: " + index);
            this.executeMove({ src: this.state.selectedTile, dst: index });
        }
    }

    executeMove = move => {
        const { src, dst } = move;
        let tiles = this.state.tiles;
        let setFreeze = false;
        if (tiles[dst].piece !== undefined) {
            if (tiles[dst].piece === "K") {
                const color = tiles[src].piece.color === "W" ? "Black" : "White";
                alert(color + " wins!")
                setFreeze = true;
            }

            // add some bars in the sides showing the eaten pieces
        }
        if (tiles[dst].piece !== undefined) {
        }
        tiles[dst].piece = tiles[src].piece;
        tiles[dst].highlight = false;
        tiles[dst].color = this.state.turn;
        tiles[dst].position = dst;
        tiles[src].position = undefined;
        tiles[src].piece = undefined;
        tiles[src].color = undefined;
        // setting the firstMove flag to false so they wont be able to castle (Rook & King) or move major stepd (Pawn)
        if (tiles[dst].piece === "P" || tiles[dst].piece === "R" || tiles[dst].piece === "K") {
            tiles[dst].firstMove = false;
        }
        this.state.targetTiles.forEach(move => tiles[move.dst].highlight = false);
        this.setState({ tiles: tiles, freeze: setFreeze, selectedTile: undefined, targetTiles: [], turn: this.state.turn === "W" ? "B" : "W" }, () => {

            if (this.state.blackPlayer === "computer" && this.state.turn === "B" && this.state.tiles.length > 0) {
                const { src, dst } = executeAIMove(this.state.tiles, this.props.difficulty);
                this.executeMove({ src, dst });

            }
        })
    }

    convertToPoint = piece => {
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

    initiateBoard = () => {
        let arr = [];
        let position = 0;
        arr.push({ position: position++, piece: "R", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "N", color: "B", highlight: false });
        arr.push({ position: position++, piece: "B", color: "B", highlight: false });
        arr.push({ position: position++, piece: "Q", color: "B", highlight: false });
        arr.push({ position: position++, piece: "K", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "B", color: "B", highlight: false });
        arr.push({ position: position++, piece: "N", color: "B", highlight: false });
        arr.push({ position: position++, piece: "R", color: "B", highlight: false, firstMove: true });

        arr.push({ position: position++, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "B", highlight: false, firstMove: true });

        // fill in empty tiles
        for (; position < 64 - 16; ++position) {
            arr.push({ position: position, piece: undefined, color: undefined });
        }

        arr.push({ position: position++, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "P", color: "W", highlight: false, firstMove: true });

        arr.push({ position: position++, piece: "R", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "N", color: "W", highlight: false });
        arr.push({ position: position++, piece: "B", color: "W", highlight: false });
        arr.push({ position: position++, piece: "Q", color: "W", highlight: false });
        arr.push({ position: position++, piece: "K", color: "W", highlight: false, firstMove: true });
        arr.push({ position: position++, piece: "B", color: "W", highlight: false });
        arr.push({ position: position++, piece: "N", color: "W", highlight: false });
        arr.push({ position: position++, piece: "R", color: "W", highlight: false, firstMove: true });
        this.setState({ tiles: arr });
    }

    showTiles = () => {
        const tiles = this.state.tiles.map((t, i) => <Tile key={i} index={i} row={Math.floor(i / 8)} piece={t.piece} color={t.color} highlight={t.highlight} tileClicked={this.tileClicked} />);
        return this.generateBoard(tiles).map((row, index) => <div key={index} className="row">{row}</div>)
    }

    render() {
        return (
            <div className="board">
                {this.showTiles()}
            </div>
        );
    }
}