import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import Holds from './holds';
export default function Homepage() {
	const [state, setState] = useContext(LoginContext);
	return (
		<div>
			ABC
			{state?.user?.userType === 'Student' && <Holds></Holds>}
		</div>
	);
}
