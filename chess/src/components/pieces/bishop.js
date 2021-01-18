import React from 'react';

const OFFSETS = [-9, -7, 7, 9];

export default class Pawn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color,
            position: props.position
        };
    }

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'B.gif'

    calculatePossibleMoves = () => {
        const possibleMoves = [];
        const tiles = this.props.getTiles();
        OFFSETS.forEach(offset => {
            const currentLine = Math.floor(this.props.position / 8);
            let tempPosition = this.props.position;
            while (tempPosition >= 0 && tempPosition <= 63) {
                if (this.isInEdge(tempPosition, offset)) {
                    break;
                }
                tempPosition += offset;
                if (tempPosition >= 0 && tempPosition <= 63) {
                    if (!tiles[tempPosition].occupied) {
                        console.log("added: " + tempPosition + " with: " + offset)
                        possibleMoves.push(tempPosition);
                    } else {
                        if (tiles[tempPosition].color !== this.props.color) {
                            console.log("added: " + tempPosition + " with: " + offset)
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
        console.log("isInEdge: pos: " + pos + "offset: " + offset)
        if (pos % 8 === 0 && (offset === -9 || offset === 7)) {
            return true;
        }
        if ((pos - 7) % 8 === 0 && (offset === -7 || offset === 9)) {
            console.log("mo here!")
            return true;
        }
        return false;
    }

    handleClick = () => {
        this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);
    }

    render() {
        return <img src={this.getImage()} alt="BISHOP" onClick={this.handleClick} />
    }
}