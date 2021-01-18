import React from 'react';

const OFFSETS = [-17, -15, -10, -6, 6, 10, 15, 17];

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
        const possibleMoves = positions.filter(pos => !tiles[pos].occupied);
        return possibleMoves;
    }

    handleClick = () => {
        console.log("My color is: ", this.props.color);
        this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);
    }

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'N.gif'

    render() {
        return <img src={this.getImage()} onClick={this.handleClick} />
    }
}