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

    highlightTiles = (positions) => {
        let arr = this.state.tiles;
        this.state.targetTiles.forEach(pos => arr[pos].highlight = false);
        positions.forEach(pos => arr[pos].highlight = !arr[pos].highlight);
        this.setState({ tiles: arr, targetTiles: positions });
    }

    tileClicked = (index) => {
        const tiles = this.state.tiles;
        if (this.state.turn === tiles[index].color) {
            const possibleMoves = calculatePossibleMoves(index, tiles)
            //console.log("Moves found: ", possibleMoves);
            this.highlightTiles(possibleMoves)
            this.setState({ selectedTile: index });
        } else if (this.state.targetTiles.some(t => t === index)) {
            this.executeMove(this.state.selectedTile, index);
        }
    }

    executeMove = (src, dst) => {
        let tiles = this.state.tiles;
        //console.log("Blacks: ", this.state.tiles.filter(t => t.color === "B"))
        //console.log("Whites: ", this.state.tiles.filter(t => t.color === "W"))
        if (tiles[dst].occupied) {
            if (tiles[dst].piece === "K") {
                const color = tiles[dst].piece.color === "W" ? "Black" : "White";
                alert(color + " wins!")
            }

            // add some bars in the sides showing the eaten pieces
        }
        if (tiles[dst].piece !== undefined) {
            //console.log(this.convertToPoint(tiles[dst].piece));
        }
        // console.log("src: ", src)
        // console.log("dst: ", dst)
        // console.log("tiles[src]: ", tiles[src])
        // console.log("tiles[dst]: ", tiles[dst])
        tiles[dst].piece = tiles[src].piece;
        tiles[dst].highlight = false;
        tiles[dst].color = this.state.turn;
        tiles[src].piece = undefined;
        tiles[src].color = undefined;
        //console.log("tiles[src]: ", tiles[src])
        //console.log("tiles[dst]: ", tiles[dst])
        // setting the firstMove flag to false so they wont be able to castle (Rook & King) or move major stepd (Pawn)
        if (tiles[dst].piece === "P" || tiles[dst].piece === "R" || tiles[dst].piece === "K") {
            tiles[dst].firstMove = false;
        }
        //console.log("Blacks: ", this.state.tiles.filter(t => t.color === "B"))
        // console.log("Whites: ", this.state.tiles.filter(t => t.color === "W"))
        this.state.targetTiles.forEach(pos => tiles[pos].highlight = false);
        this.setState({ tiles: tiles, selectedTile: undefined, targetTiles: [], turn: this.state.turn === "W" ? "B" : "W" }, () => {

            if (this.state.blackPlayer === "computer" && this.state.turn === "B" && this.state.tiles.length > 0) {
                //console.log("Blacks: ", this.state.tiles.filter(t => t.color === "B"))
                //console.log("Whites: ", this.state.tiles.filter(t => t.color === "W"))
                console.log("Blacks: ", this.state.tiles.filter(t => t.color === "B"))
                const { src, dst } = executeAIMove(this.state.tiles, this.props.difficulty);
                console.log("Blacks: ", this.state.tiles.filter(t => t.color === "B"))
                //console.log("Move from: " + src + " to: " + dst)
                this.executeMove(src, dst);

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
        //console.log("im here!")
        arr.push({ piece: "R", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "N", color: "B", highlight: false });
        arr.push({ piece: "B", color: "B", highlight: false });
        arr.push({ piece: "Q", color: "B", highlight: false });
        arr.push({ piece: "K", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "B", color: "B", highlight: false });
        arr.push({ piece: "N", color: "B", highlight: false });
        arr.push({ piece: "R", color: "B", highlight: false, firstMove: true });

        arr.push({ piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "B", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "B", highlight: false, firstMove: true });

        // fill in empty tiles
        for (let i = 0; i < 32; ++i) {
            arr.push({ piece: undefined, color: undefined, occupied: false, });
        }

        arr.push({ piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "P", color: "W", highlight: false, firstMove: true });

        arr.push({ piece: "R", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "N", color: "W", highlight: false });
        arr.push({ piece: "B", color: "W", highlight: false });
        arr.push({ piece: "Q", color: "W", highlight: false });
        arr.push({ piece: "K", color: "W", highlight: false, firstMove: true });
        arr.push({ piece: "B", color: "W", highlight: false });
        arr.push({ piece: "N", color: "W", highlight: false });
        arr.push({ piece: "R", color: "W", highlight: false, firstMove: true });
        this.setState({ tiles: arr });
    }

    showTiles = () => {
        //console.log("Blacks: ", this.state.tiles.filter(t => t.color === "B"))
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