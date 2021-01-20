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
        const possibleMoves = [];
        const tiles = this.props.getTiles();
        OFFSETS.forEach(offset => {
            let tempPosition = this.props.position;
            if (!this.isInEdge(tempPosition, offset)) {
                tempPosition += offset;
                if (tempPosition >= 0 && tempPosition <= 63) {
                    if (!tiles[tempPosition].occupied) {
                        console.log("added: " + tempPosition + " with offset: " + offset)
                        possibleMoves.push(tempPosition);
                    } else {
                        if (tiles[tempPosition].color !== this.props.color) {
                            console.log("added: " + tempPosition + " with offset: " + offset)
                            possibleMoves.push(tempPosition);
                        }
                    }
                }
            }
        })
        return possibleMoves;
    }

    isInEdge = (pos, offset) => {
        if (pos % 8 === 0 && (offset === -17 || offset === -10
            || offset === 6 || offset === 15)) {
            return true;
        }
        if ((pos - 1) % 8 === 0 && (offset === -10 || offset === 10 || offset === 6)) {
            return true;
        }
        if ((pos - 6) % 8 === 0 && (offset === -6 || offset === 10)) {
            return true;
        }
        if ((pos - 7) % 8 === 0 && (offset === -15 || offset === -6 || offset === 10 || offset === 17)) {
            return true;
        }
        return false;
    }

    handleClick = () => this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'N.gif'

    render() {
        return <img src={this.getImage()} alt="KNIGHT" onClick={this.handleClick} />
    }
}