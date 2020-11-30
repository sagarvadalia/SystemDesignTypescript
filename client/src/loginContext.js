import React, { createContext, useState } from 'react';

const LoginContext = createContext();

const LoginProvider = (props) => {
	const [state, setState] = useState([{}, () => {}]);

	return <LoginContext.Provider value={[state, setState]}>{props.children}</LoginContext.Provider>;
};
export { LoginContext, LoginProvider };
