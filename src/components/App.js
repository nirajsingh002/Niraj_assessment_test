import React, { Component } from 'react'
import { ThemeProvider, } from "react-jss";
import ListingContainer from './containers/ListingContainer';
import PropTypes from 'prop-types';
// bootstrap common css 
import './App.css'

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
    }

    componentDidMount() {
        
        this.props.fetchPostsIfNeeded()
      }

      
    render() {
        // each of these inject methods creates reusable elements from the Resuables and injects with the style from theme
        const { cartoonCharacters } = this.props;
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

App.propTypes = {
    fetchPostsIfNeeded: PropTypes.func,
    cartoonCharacters: PropTypes.object
  };

const mapStateToProps = (state) => {
    console.log('App', state);
    return {
        cartoonCharacters: state.fetchCharacters,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);