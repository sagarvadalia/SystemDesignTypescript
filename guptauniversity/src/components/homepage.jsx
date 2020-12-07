import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MajorTable from './Student/MajorTable';
import StudentSchedule from './Student/studentSchedule';
import Holds from './Student/holds';
import MinorTable from './Student/MinorTable';
export default function Homepage() {
	const [state, setState] = useContext(LoginContext);
	return (
		<div>
			ABC
			{state?.user?.userType === 'Student' && (
				<div>
					<Holds></Holds>
					<MajorTable></MajorTable>
					<MinorTable></MinorTable>
					<StudentSchedule></StudentSchedule>
				</div>
			)}
		</div>
	);
}
