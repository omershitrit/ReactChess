import React from 'react';
import Tile from './tile.js';
import Pawn from './pieces/pawn.js';
import Rook from './pieces/rook.js';
import Knight from './pieces/knight.js';
import Bishop from './pieces/bishop.js';
import King from './pieces/king.js';
import Queen from './pieces/queen.js';
import './board.css';

//const NUM_TILES = 64;
const NUM_TILES = 64;

export default class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            whitePlayer: undefined,
            blackPlayer: undefined,
            turn: undefined
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

    generatePiece = (piece, color, index) => {
        if (color === "W") {
            if (piece === "P") { return <Pawn color="W" position={index} /> }
            else if (piece === "B") { return <Bishop color="W" position={index} /> }
            else if (piece === "K") { return <King color="W" position={index} /> }
            else if (piece === "N") { return <Knight color="W" position={index} getTiles={this.getTiles} /> }
            else if (piece === "Q") { return <Queen color="W" position={index} /> }
            else if (piece === "R") { return <Rook color="W" position={index} /> }
        } else {
            if (piece === "P") { return <Pawn color="B" position={index} /> }
            else if (piece === "B") { return <Bishop color="B" position={index} /> }
            else if (piece === "K") { return <King color="B" position={index} /> }
            else if (piece === "N") { return <Knight color="B" position={index} getTiles={this.getTiles} /> }
            else if (piece === "Q") { return <Queen color="B" position={index} /> }
            else if (piece === "R") { return <Rook color="B" position={index} /> }
        }
    }


    //generateTile = t => <Tile key={t.index} index={t.index} row={t.row} piece={this.generatePiece(t.piece, t.color, t.index)} />

    initiateBoard = () => {
        let arr = [];
        let index = 0

        arr.push({ position: index++, row: 0, occupied: true, piece: "R", color: "B" });
        arr.push({ position: index++, row: 0, occupied: true, piece: "N", color: "B" });
        arr.push({ position: index++, row: 0, occupied: true, piece: "B", color: "B" });
        arr.push({ position: index++, row: 0, occupied: true, piece: "Q", color: "B" });
        arr.push({ position: index++, row: 0, occupied: true, piece: "K", color: "B" });
        arr.push({ position: index++, row: 0, occupied: true, piece: "B", color: "B" });
        arr.push({ position: index++, row: 0, occupied: true, piece: "N", color: "B" });
        arr.push({ position: index++, row: 0, occupied: true, piece: "R", color: "B" });

        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B" });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B" });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B" });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B" });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B" });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B" });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B" });
        arr.push({ position: index++, row: 1, occupied: true, piece: "P", color: "B" });

        // fill in empty tiles
        for (; index < NUM_TILES - 16; ++index) {
            //arr.push(<Tile key={index} index={index} row={Math.floor(index / 8)} />);
            arr.push({ position: index, row: Math.floor(index / 8), occupied: false, piece: undefined, color: undefined });
        }

        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W" });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W" });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W" });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W" });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W" });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W" });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W" });
        arr.push({ position: index++, row: 6, occupied: true, piece: "P", color: "W" });

        arr.push({ position: index++, row: 7, occupied: true, piece: "R", color: "W" });
        arr.push({ position: index++, row: 7, occupied: true, piece: "N", color: "W" });
        arr.push({ position: index++, row: 7, occupied: true, piece: "B", color: "W" });
        arr.push({ position: index++, row: 7, occupied: true, piece: "Q", color: "W" });
        arr.push({ position: index++, row: 7, occupied: true, piece: "K", color: "W" });
        arr.push({ position: index++, row: 7, occupied: true, piece: "B", color: "W" });
        arr.push({ position: index++, row: 7, occupied: true, piece: "N", color: "W" });
        arr.push({ position: index++, row: 7, occupied: true, piece: "R", color: "W" });
        this.setState({ tiles: arr });


        /*arr.push(<Tile index={index} row={0} occupied={true} piece={<Rook color="B" />} key={index++} />);
        arr.push(<Tile index={index} row={0} occupied={true} piece={<Knight color="B" position={index} />} key={index++} />);
        arr.push(<Tile index={index} row={0} occupied={true} piece={<Bishop color="B" />} key={index++} />);
        arr.push(<Tile index={index} row={0} occupied={true} piece={<Queen color="B" />} key={index++} />);
        arr.push(<Tile index={index} row={0} occupied={true} piece={<King color="B" />} key={index++} />);
        arr.push(<Tile index={index} row={0} occupied={true} piece={<Bishop color="B" />} key={index++} />);
        arr.push(<Tile index={index} row={0} occupied={true} piece={<Knight color="B" position={index} />} key={index++} />);
        arr.push(<Tile index={index} row={0} occupied={true} piece={<Rook color="B" position={index} board={this} />} key={index++} />);
        arr.push(<Tile index={index} row={1} occupied={true} piece={<Pawn color="B" position={index} board={this} />} key={index++} />);
        arr.push(<Tile index={index} row={1} occupied={true} piece={<Pawn color="B" position={index} board={this} />} key={index++} />);
        arr.push(<Tile index={index} row={1} occupied={true} piece={<Pawn color="B" position={index} board={this} />} key={index++} />);
        arr.push(<Tile index={index} row={1} occupied={true} piece={<Pawn color="B" position={index} board={this} />} key={index++} />);
        arr.push(<Tile index={index} row={1} occupied={true} piece={<Pawn color="B" position={index} board={this} />} key={index++} />);
        arr.push(<Tile index={index} row={1} occupied={true} piece={<Pawn color="B" position={index} board={this} />} key={index++} />);
        arr.push(<Tile index={index} row={1} occupied={true} piece={<Pawn color="B" position={index} board={this} />} key={index++} />);
        arr.push(<Tile index={index} row={1} occupied={true} piece={<Pawn color="B" position={index} board={this} />} key={index++} />);

        // fill in empty tiles
        for (; index < NUM_TILES - 16; ++index) {
            arr.push(<Tile key={index} index={index} row={Math.floor(index / 8)} />);
        }

        arr.push(<Tile index={index} row={6} occupied={true} piece={<Pawn color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={6} piece={<Pawn color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={6} piece={<Pawn color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={6} piece={<Pawn color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={6} piece={<Pawn color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={6} piece={<Pawn color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={6} piece={<Pawn color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={6} piece={<Pawn color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={7} piece={<Rook color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={7} piece={<Knight color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={7} piece={<Bishop color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={7} piece={<Queen color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={7} piece={<King color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={7} piece={<Bishop color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={7} piece={<Knight color="W" />} key={index++} />);
        arr.push(<Tile index={index} row={7} piece={<Rook color="W" />} key={index++} />);

        arr.map(t => <Tile index={t.index} row={t.row} piece={t.piece} />)

        let tiles = this.generateBoard(arr).map((row, index) => <div key={index} className="row">{row}</div>)
        this.setState({ tiles: tiles })*/
    }

    showTiles = () => {
        //const bla = this.tiles.map(t => <Tile index={t.index} row={t.row} piece={t.piece} />)
        const temp = this.state.tiles.map((t, key) => <Tile key={key} index={t.position} row={t.row} piece={this.generatePiece(t.piece, t.color, t.index)} />);
        return this.generateBoard(temp).map((row, index) => <div key={index} className="row">{row}</div>)
    }

    getTiles = () => this.state.tiles;

    // 49 -> row: 6, column: 1
    getTile = (index) => {

        const row = Math.floor(index / 8);
        const column = index - row * 8;
        return this.state.tiles[row].props.children[column];
    }

    render() {
        return (
            <div className="board">
                {this.showTiles()}
            </div>
        );
    }
}