import React, { Component } from 'react'
import injectSheet, { ThemeProvider, } from "react-jss";

import ListingContainer from './containers/ListingContainer';
import SearchBox from './containers/SearchBox';
// bootstrap common css 
import './App.css'
// reusable components
import Reusables from '../jss/reusables/inputs';

// styles
import LayoutStyles from '../jss/reusables/styles/layout';
import ColumnStyles from '../jss/reusables/styles/column';

// themes
import defaulttheme from '../jss/reusables/styles/themes/default'
// redux implementation
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/actionCreators';
import { connect } from 'react-redux';

// actions

// components
// import Main from './components/Main';

class App extends Component {
    constructor(props) {
        super(props);
        // set up a theme state, defaulttheme
        this.state = {
            theme: defaulttheme,
        }
        console.log('props', this.props)
    }

    componentDidMount() {
        
        this.props.fetchPostsIfNeeded()
      }

      /* componentWillReceiveProps(prevProps) {
        if (this.props.cartoonCharacters.items[0].id !== prevProps.cartoonCharacters.items[0].id) {
            this.props.fetchPostsIfNeeded()
        }
      } */

    render() {
        // each of these inject methods creates reusable elements from the Resuables and injects with the style from theme
        const { cartoonCharacters } = this.props;
        const LayoutComponent = injectSheet(LayoutStyles)(Reusables.Layout)
        const ColumnComponent = injectSheet(ColumnStyles)(Reusables.Column)
        return (
            <ThemeProvider theme={this.state.theme}>
                <div className="container-fluid">
                    <h1>Characters of Rick and Morty Show</h1>
                    <div className="row">
                        {cartoonCharacters.items.length > 0 &&
                            <ListingContainer data={this.props}/>
                        }
                    </div>

                </div>
            </ThemeProvider>
        )
    }
}


const mapStateToProps = (state) => {
    console.log('app component', state)
    return {
        cartoonCharacters: state.fetchCharacters,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);