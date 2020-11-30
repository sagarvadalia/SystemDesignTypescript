import * as React from 'react';
import { useContext } from 'react';
import { LoginContext } from '../../loginContext';
import PersistentDrawerLeft from './appbar';

export default function Navbar(props) {
	return (
		<>
			<PersistentDrawerLeft></PersistentDrawerLeft>
		</>
	);
}
