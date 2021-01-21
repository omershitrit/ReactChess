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

    handleClick = () => this.props.highlightTiles(this.calculatePossibleMoves(), this.props.color);

    calculatePossibleMoves = () => {
        let possibleOffsets = [];
        let possibleMoves = [];
        const tiles = this.props.getTiles();
        OFFSETS.forEach(offset => {
            const dst = this.props.position + this.props.direction * offset;
            if (offset === 16 && this.props.firstMove && !tiles[dst].occupied && !tiles[dst + this.props.direction * 8].occupied) {
                possibleOffsets.push(offset);
            } else if (offset === 7 || offset === 9) {
                if (tiles[dst].occupied && tiles[dst].color !== this.props.color && !this.isPawnInEdge(this.props.position, offset)) {
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
        return possibleMoves.filter(pos => pos >= 0 && pos <= 63);
    }

    isPawnInEdge = (pos, offset) => {
        if (pos % 8 === 0 && offset === 7) {
            return true;
        }
        if ((pos - 7) % 8 === 0 && offset === 9) {
            return true;
        }
        return false;
    }


    getImage = () => process.env.PUBLIC_URL + '/' + this.state.color + 'P.gif'

    render() {
        return <img src={this.getImage()} alt="PAWN" onClick={this.handleClick} />
    }
}