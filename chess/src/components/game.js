import React from 'react';

export default class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tiles: [],
            white: undefined,
            black: undefined
        };
    }

    executeMove = (src, dst, toRemove) => console.log("executing ...");

    render() {
        return (
            <Board executeMove={this.executeMove} tiles={this.state.tiles} />
        );
    }
}