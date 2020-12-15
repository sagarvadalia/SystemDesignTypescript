import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
export default function SetBools() {
	const [data, setData] = useState({
		canAddCourse: {},
		canAddMidtermGrade: {},
		canDropCourse: {},
		canAddFinalGrade: {},
	});
	const [state, setState] = useContext(LoginContext);
	async function setAddTime() {
		let val = axios.get(`/api/grading/AddCourse`);
		setData({ ...data, canAddCourse: !data.canAddCourse });
	}
	async function setDropTime() {
		let val = axios.get(`/api/grading/DropCourse`);

		setData({ ...data, canDropCourse: !data.canDropCourse });
	}
	async function setMidtermTime() {
		let val = axios.get(`/api/grading/MidtermGrade`);
		setData({ ...data, canAddMidtermGrade: !data.canAddMidtermGrade });
	}

	async function setFinalTime() {
		let val = axios.get(`/api/grading/FinalGrade`);
		setData({ ...data, canAddFinalGrade: !data.canAddFinalGrade });
	}
	useEffect(() => {
		const fetchData = async () => {
			const result = await axios(`/api/allGrading`);

			setData(result.data);
			console.log(result.data);
		};

		fetchData();
	}, []);

	return (
		<div>
			ABC
			{data?.canAddCourse && (
				<div>
					Currently students are allowed to add classes if you would like to change that click this button:{' '}
					<Button onClick={() => setAddTime()}>Disallow Adding Classes</Button>
				</div>
			)}
			{!data?.canAddCourse && (
				<div>
					Currently students are not allowed to add classes if you would like to change that click this
					button: <Button onClick={() => setAddTime()}>Allow Adding classes</Button>
				</div>
			)}
			{data?.canDropCourse && (
				<div>
					Currently students are allowed to drop classes if you would like to change that click this button:{' '}
					<Button onClick={() => setDropTime()}>Disallow Adding Classes</Button>
				</div>
			)}
			{!data?.canDropCourse && (
				<div>
					Currently students are not allowed to drop classes if you would like to change that click this
					button: <Button onClick={() => setDropTime()}>Allow Dropping Classes</Button>
				</div>
			)}
			{data?.canAddMidtermGrade && (
				<div>
					Currently faculty are allowed to add midterm grades if you would like to change that click this
					button: <Button onClick={() => setMidtermTime()}>Disallow Setting Midterm Grades</Button>
				</div>
			)}
			{!data?.canAddMidtermGrade && (
				<div>
					Currently faculty are not allowed to add midterm grades if you would like to change that click this
					button: <Button onClick={() => setMidtermTime()}>Allow Setting Midterm Grades</Button>
				</div>
			)}
			{data?.canAddFinalGrade && (
				<div>
					Currently faculty are allowed to add final grades if you would like to change that click this
					button: <Button onClick={() => setFinalTime()}>Disallow Setting Final Grades</Button>
				</div>
			)}
			{!data?.canAddFinalGrade && (
				<div>
					Currently faculty are not allowed to add final grades if you would like to change that click this
					button: <Button onClick={() => setFinalTime()}>Allow Setting Final Grades</Button>
				</div>
			)}
		</div>
	);
}
