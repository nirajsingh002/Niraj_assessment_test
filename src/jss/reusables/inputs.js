import React, { Component } from 'react';

class Layout extends Component {
    render() {
        return (
            <div className={this.props.classes.layout}>
                {this.props.children}
            </div>
        )
    }
}
class Row extends Component {
    render() {
        return (
            <div className={this.props.classes.row}>
                {this.props.children}
            </div>
        )
    }
}

class Column extends Component {
    render() {
        return (
            <div className={this.props.classes.col}>
                {this.props.children}
            </div>
        )
    }
}
const Reusables = {
    Layout: Layout,
    Row: Row,
    Column: Column,
};
export default Reusables;