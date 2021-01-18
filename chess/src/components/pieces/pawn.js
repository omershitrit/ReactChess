import React from 'react';

const OFFSETS = [7, 8, 9, 16];

export default class Pawn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            position: props.position,
            board: props.board,
            direction: props.direction
        };
    }

    isTileValid = i => i >= 0 && i < 64;

    handleClick = () => {
        console.log(this.calculatePossibleMoves());
        this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);
    }

    calculatePossibleMoves = () => {
        const positions = OFFSETS.map(offset => this.state.position + (this.props.direction * offset)).filter(pos => pos >= 0 && pos <= 63)
        const tiles = this.props.getTiles();
        const possibleMoves = positions.filter(pos => !tiles[pos].occupied);
        return possibleMoves;
    }

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'P.gif'

    render() {
        return <img src={this.getImage()} alt="PAWN" onClick={this.handleClick} />
    }
}