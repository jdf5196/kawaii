import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.js';
import { HashRouter } from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom';
import './styles/styles.scss';

ReactDOM.render(
	(<BrowserRouter>
		<App />
	</BrowserRouter>
	),
	document.getElementById('app')
);