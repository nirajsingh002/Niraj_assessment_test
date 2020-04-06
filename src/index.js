import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './jss/reusables/styles/reset.css';
import './jss/reusables/styles/grid.css';
import App from './components/App';

ReactDOM.render(
<BrowserRouter>
    <App />
</BrowserRouter>, 
document.getElementById('container'));