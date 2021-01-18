import React from 'react';

const OFFSETS = [-8, -1, 1, 8];

export default class Pawn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color
        };
    }

    calculatePossibleMoves = () => {
        // need to filter knightInEdge cases!!!
        const possibleMoves = [];
        const tiles = this.props.getTiles();
        OFFSETS.forEach(offset => {
            const currentLine = Math.floor(this.props.position / 8);
            let tempPosition = this.props.position + offset;
            while (tempPosition >= 0 && tempPosition <= 63) {
                if (offset === 1 || offset === -1) {
                    if (currentLine !== Math.floor(tempPosition / 8)) {
                        break;
                    }
                } else {

                }
                if (tiles[tempPosition].occupied) {
                    if (tiles[tempPosition].color !== this.props.color) {
                        possibleMoves.push(tempPosition);
                    }
                    break;
                }
                possibleMoves.push(tempPosition);
                tempPosition += offset;
            }
        })
        return possibleMoves;
    }

    handleClick = () => {
        console.log("My color is: ", this.props.color);
        this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);
    }

    isInEdge = (pos, offset, originLine) => {

        return false;
    }

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'R.gif'

    render() {
        return <img src={this.getImage()} alt="ROOK" onClick={this.handleClick} />
    }
}