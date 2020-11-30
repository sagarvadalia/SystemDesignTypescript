import React from 'react';
import { Users } from '../server/entity/Users/Users';

const logInContext: React.Context<{user: Users} | {user: {}}> = React.createContext({user: {}});

export {
    logInContext
};

export default logInContext;