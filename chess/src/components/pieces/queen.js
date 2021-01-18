import React from 'react';

export default class Pawn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: props.color
        };
    }

    getImage = imgPath => process.env.PUBLIC_URL + '/' + this.state.color + 'Q.gif'

    render() {
        return <img src={this.getImage()} />
    }
}