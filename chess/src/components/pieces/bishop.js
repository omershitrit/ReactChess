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
        let moves = [];
        for (let i = 0; i < OFFSETS.length; ++i) {
            let tempPosition = this.state.position;
            while (this.state.position >= 0 && this.state.position < 64) {

            }
        }
    }

    render() {
        return <img src={this.getImage()} />
    }
}