import React from 'react';
import './tile.css';

export default class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            index: props.index,
            row: props.row,
            piece: props.piece,
            occupied: props.piece !== undefined ? true : false
        };
    }

    //isOccupied = () => this.state.piece === undefined ? true : false;

    componentDidMount = () => {
        if (this.state.piece !== undefined) {
            this.setState({ occupied: true });
        }
    }

    getColor = () => (this.state.index + this.state.row) % 2 === 0 ? "white tile" : "brown tile";

    handleClick = () => {
        if (this.props.occupied) {
            // show possible moves
            // be able to preform a move
        } else {
            // be ready to preform a move
        }
        this.props.tileClicked(this.state.index);
    }

    render() {
        return (
            <div className={this.getColor()} onClick={this.handleClick}>{this.props.index}
                {this.props.piece != undefined && <img src={process.env.PUBLIC_URL + '/' + this.props.color + this.props.piece + '.gif'} alt="PIECE" />}
                {this.props.highlight && <img src={process.env.PUBLIC_URL + '/possibleMoveGif.gif'} alt="HIGHLIGHT" />}
            </div>
        );
    }
}