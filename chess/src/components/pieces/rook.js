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
        const possibleMoves = [];
        const tiles = this.props.getTiles();
        OFFSETS.forEach(offset => {
            //const currentLine = Math.floor(this.props.position / 8);
            let tempPosition = this.props.position;
            while (tempPosition >= 0 && tempPosition <= 63) {
                if (this.isInEdge(tempPosition, offset)) {
                    break;
                }
                tempPosition += offset;
                if (tempPosition >= 0 && tempPosition <= 63) {
                    if (!tiles[tempPosition].occupied) {
                        possibleMoves.push(tempPosition);
                    } else {
                        if (tiles[tempPosition].color !== this.props.color) {
                            possibleMoves.push(tempPosition);
                        }
                        break;
                    }
                }
            }
        })
        return possibleMoves;
    }

    isInEdge = (pos, offset) => {
        if ((pos - 7) % 8 === 0 && offset === 1) {
            return true;
        }
        if (pos % 8 === 0 && offset === -1) {
            return true;
        }
        return false;
    }

    handleClick = () => this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'R.gif'

    render() {
        return <img src={this.getImage()} alt="ROOK" onClick={this.handleClick} />
    }
}