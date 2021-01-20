import React from 'react';

const OFFSETS = [-9, -8, -7, -1, 1, 7, 8, 9];

export default class Queen extends React.Component {

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
            while (tempPosition >= 0 && tempPosition <= 63) {
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
                            break;
                        }
                    }
                } else {
                    break;
                }
            }
        })
        return possibleMoves;
    }

    handleClick = () => this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);

    isInEdge = (pos, offset) => {
        if (pos % 8 === 0 && (offset === -9 || offset === -1 ||
            offset === 7)) {
            return true;
        }
        if ((pos - 7) % 8 === 0 && (offset === -7 || offset === 1 ||
            offset === 9)) {
            return true;
        }
        return false;
    }






    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'Q.gif'

    render() {
        return <img src={this.getImage()} alt="QUEEN" onClick={this.handleClick} />
    }
}