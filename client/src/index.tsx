import * as React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';
import history from './history';
import { Users } from '../server/entity/Users/Users';
import { useEffect } from 'react';
import axios from 'axios';

ReactDOM.render(
	<React.StrictMode>
		<Router history={history}>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById('root'),
);
