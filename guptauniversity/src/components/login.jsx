import React, { useReducer, useEffect, useContext } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { LoginContext } from './../LoginContext';

const useStyles = makeStyles((theme) =>
	createStyles({
		container: {
			display: 'flex',
			flexWrap: 'wrap',
			width: 400,
			margin: `${theme.spacing(0)} auto`,
		},
		loginBtn: {
			marginTop: theme.spacing(2),
			flexGrow: 1,
		},
		header: {
			textAlign: 'center',
			background: '#212121',
			color: '#fff',
		},
		card: {
			marginTop: theme.spacing(10),
		},
	}),
);

//state type

const initialState = {
	username: '',
	password: '',
	isButtonDisabled: true,
	helperText: '',
	isError: false,
};

const reducer = (state, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case 'setUsername':
			return {
				...state,
				username: action.payload,
			};
		case 'setPassword':
			return {
				...state,
				password: action.payload,
			};
		case 'setIsButtonDisabled':
			return {
				...state,
				isButtonDisabled: action.payload,
			};
		case 'loginSuccess':
			return {
				...state,
				helperText: action.payload,
				isError: false,
			};
		case 'loginFailed':
			return {
				...state,
				helperText: action.payload,
				isError: true,
			};
		case 'setIsError':
			return {
				...state,
				isError: action.payload,
			};
	}
};

export const Login = ({ history }) => {
	const [login, setLogin] = useContext(LoginContext);
	const classes = useStyles();
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		if (state.username.trim() && state.password.trim()) {
			dispatch({
				type: 'setIsButtonDisabled',
				payload: false,
			});
		} else {
			dispatch({
				type: 'setIsButtonDisabled',
				payload: true,
			});
		}
	}, [state.username, state.password]);

	const handleLogin = async () => {
		let user = await axios.get('/api/login', { params: { email: state.username, password: state.password } });
		console.log('here');
		if (user) {
			console.log('here?');
			setLogin((login) => ({ ...login, user: user.data }));
			history.push('/');
		}

		if (user) {
			dispatch({
				type: 'loginSuccess',
				payload: 'Login Successfully',
			});
		} else {
			dispatch({
				type: 'loginFailed',
				payload: 'Incorrect username or password',
			});
		}
	};

	const handleKeyPress = (event) => {
		if (event.keyCode === 13 || event.which === 13) {
			state.isButtonDisabled || handleLogin();
		}
	};

	const handleUsernameChange = (event) => {
		dispatch({
			type: 'setUsername',
			payload: event.target.value,
		});
	};

	const handlePasswordChange = (event) => {
		dispatch({
			type: 'setPassword',
			payload: event.target.value,
		});
	};
	return (
		<form className={classes.container} noValidate autoComplete="off">
			<Card className={classes.card}>
				<CardHeader className={classes.header} title="Login App" />
				<CardContent>
					<div>
						<TextField
							error={state.isError}
							fullWidth
							id="username"
							type="email"
							label="Username"
							placeholder="Username"
							margin="normal"
							onChange={handleUsernameChange}
							onKeyPress={handleKeyPress}
						/>
						<TextField
							error={state.isError}
							fullWidth
							id="password"
							type="password"
							label="Password"
							placeholder="Password"
							margin="normal"
							helperText={state.helperText}
							onChange={handlePasswordChange}
							onKeyPress={handleKeyPress}
						/>
					</div>
				</CardContent>
				<CardActions>
					<Button
						variant="contained"
						size="large"
						color="secondary"
						className={classes.loginBtn}
						onClick={handleLogin}
						disabled={state.isButtonDisabled}
					>
						Login
					</Button>
				</CardActions>
			</Card>
		</form>
	);
};
