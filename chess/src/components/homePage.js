import React from 'react';
import './homePage.css';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            choice: 0
        };
    }

    handleClick = e => this.props.showBoard(e.target.value);

    render() {
        return (
            <div className="home">
                <div className="title">Play Chess for free!</div>
                <button className="btn red" onClick={this.handleClick} vlaue="friend">Play Online!</button>
                <button className="btn green" onClick={this.handleClick} value="computer">Play Computer!</button>
            </div >
        );
    }
}
