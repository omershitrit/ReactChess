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
        this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);
    }

    calculatePossibleMoves = () => {
        let possibleOffsets = [];
        let possibleMoves = [];
        const tiles = this.props.getTiles();
        OFFSETS.forEach(offset => {
            if (offset === 16 && this.props.firstMove) {
                possibleOffsets.push(offset);
            } else if (offset === 7 || offset === 9) {
                const dst = this.props.position + this.props.direction * offset;
                if (tiles[dst].occupied && tiles[dst].color !== this.props.color) {
                    possibleOffsets.push(offset);
                }
            } else if (offset === 8) {
                possibleOffsets.push(offset);
            }
        });
        possibleMoves = [];
        possibleOffsets.forEach(offset => {
            const tempPosition = this.props.position + offset * this.props.direction;
            if (!(offset === 8 && tiles[tempPosition].occupied)) {
                possibleMoves.push(tempPosition);
            }
        })
        return possibleMoves.filter(pos => pos >= 0 && pos <= 63);;
    }

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'P.gif'

    render() {
        return <img src={this.getImage()} alt="PAWN" onClick={this.handleClick} />
    }
}