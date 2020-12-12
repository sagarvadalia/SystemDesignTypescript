import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
export default function SetBools() {
	const [data, setData] = useState([{}]);
	const [state, setState] = useContext(LoginContext);
	async function setAddTime() {
		axios(`/api/grading/AddCourse`);
	}
	async function setDropTime() {
		axios(`/api/grading/AddCourse`);
	}
	async function setMidtermTime() {
		axios(`/api/grading/MidtermGrade`);
	}

	async function setFinalTime() {
		axios(`/api/grading/FinalGrade`);
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/users`);

			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			{data?.addTime && (
				<div>
					Currently students are allowed to add classes if you would like to change that click this button:{' '}
					<Button onClick={() => setAddTime()}>Disallow Adding Classes</Button>
				</div>
			)}
			{!data?.addTime && (
				<div>
					Currently students are not allowed to add classes if you would like to change that click this
					button: <Button onClick={() => setAddTime()}>Allow Adding classes</Button>
				</div>
			)}
			{data?.dropTime && (
				<div>
					Currently students are allowed to drop classes if you would like to change that click this button:{' '}
					<Button onClick={() => setDropTime()}>Disallow Adding Classes</Button>
				</div>
			)}
			{!data?.dropTime && (
				<div>
					Currently students are not allowed to drop classes if you would like to change that click this
					button: <Button onClick={() => setDropTime()}>Allow Dropping Classes</Button>
				</div>
			)}
			{data?.midtermTime && (
				<div>
					Currently faculty are allowed to add midterm grades if you would like to change that click this
					button: <Button onClick={() => setMidtermTime()}>Disallow Setting Midterm Grades</Button>
				</div>
			)}
			{!data?.midtermTime && (
				<div>
					Currently faculty are not allowed to add midterm grades if you would like to change that click this
					button: <Button onClick={() => setMidtermTime()}>Allow Setting Midterm Grades</Button>
				</div>
			)}
			{data?.finalTime && (
				<div>
					Currently faculty are allowed to add final grades if you would like to change that click this
					button: <Button onClick={() => setFinalTime()}>Disallow Setting Final Grades</Button>
				</div>
			)}
			{!data?.finalTime && (
				<div>
					Currently faculty are not allowed to add final grades if you would like to change that click this
					button: <Button onClick={() => setFinalTime()}>Allow Setting Final Grades</Button>
				</div>
			)}
		</div>
	);
}
