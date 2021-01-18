import React from 'react';

const OFFSETS = [-9, -8, -7, -1, 1, 7, 8, 9];

export default class Pawn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color
        };
    }

    calculatePossibleMoves = () => {
        // need to filter knightInEdge cases!!!
        const positions = OFFSETS.map(offset => this.props.position + offset).filter(pos => pos >= 0 && pos <= 63)
        const tiles = this.props.getTiles();
        console.log(positions)
        const possibleMoves = positions.filter(pos => !tiles[pos].occupied);
        return possibleMoves;
    }

    handleClick = () => {
        console.log("My color is: ", this.props.color);
        this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);
    }

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'K.gif'

    render() {
        return <img src={this.getImage()} onClick={this.handleClick} />
    }
}