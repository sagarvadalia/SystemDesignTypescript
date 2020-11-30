import React, { Component, useContext } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Login } from './login';
import Schedule from './schedule';
import StudentTranscript from './studentTranscript';
import { LoginContext } from './../LoginContext';

export const Routes = ({}) => {
	const [state, setState] = useContext(LoginContext);
	return (
		<Switch>
			{/* Routes placed here are available to all visitors */}
			<Route path="/login" component={Login} />
			{/* we need to change this to match the student id */}

			{state?.user?.userType === 'Student' && (
				<Switch>
					<Route path="/student-transcript" component={StudentTranscript} />
				</Switch>
			)}

			{/* IF FACULTY */}

			{/* Displays our Login component as a fallback */}
			<Route component={Schedule} />
		</Switch>
	);
};