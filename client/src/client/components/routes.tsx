import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login } from './login';
import Schedule from './schedule';
import StudentTranscript from './studentTranscript';




interface routesProps {

}

export const Routes: React.FC<routesProps> = ({ }) => {
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
		  <Route path="/login" component={Login} />
		  {/* we need to change this to match the student id */}
		  <Route path='/student-transcript' component = {StudentTranscript} />

      {/* Displays our Login component as a fallback */}
      <Route component={Schedule} />
    </Switch>

  );
}


