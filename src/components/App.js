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

class App extends Component {
    constructor(props) {
        super();
        // set up a theme state, defaulttheme
        this.state = {
            theme: defaulttheme,
        }
    }
    render() {
        // each of these inject methods creates reusable elements from the Resuables and injects with the style from theme

        const LayoutComponent = injectSheet(LayoutStyles)(Reusables.Layout)
        const ColumnComponent = injectSheet(ColumnStyles)(Reusables.Column)
        return (
            <ThemeProvider theme={this.state.theme}>
                <div className="container-fluid">
                    <h1>Characters of Rick and Morty Show</h1>
                    <div className="row">
                            <ListingContainer />
                    </div>

                </div>
            </ThemeProvider>
        )
    }
}


export default App;