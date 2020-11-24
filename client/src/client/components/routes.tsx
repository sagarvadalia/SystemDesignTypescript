import React, { Component } from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Login } from './login';
import Schedule from './schedule';




interface routesProps {

}

export const Routes: React.FC<routesProps> = ({ }) => {
  return (
    <Switch>
      {/* Routes placed here are available to all visitors */}
      <Route path="/login" component={Login} />

      {/* Displays our Login component as a fallback */}
      <Route component={Schedule} />
    </Switch>

  );
}


