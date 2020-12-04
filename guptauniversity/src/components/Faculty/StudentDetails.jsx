import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from './../../LoginContext';
import { Link, useParams } from 'react-router-dom'
export default function StudentDetails() {
  const [data, setData] = useState([{ semesterID: {}, courseName: 'test' }]);
  const [state, setState] = useContext(LoginContext);
  let { sID } = useParams()
  sID = parseInt(sID);
  useEffect(() => {
    const fetchData = async () => {
      console.log(sID);
      const result = await axios(`/api/enrollment/${sID}`);
      console.log('result');
      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    // API IS HERE https://material-table.com/#/

    <div>
      {/* <pre>{JSON.stringify(data)}</pre> */}

      <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          title="Basic Sorting Preview"
          columns={[
            { title: 'Class Number', field: 'classNumber' },
            { title: 'Semester Season', field: 'semester.semesterName' },
            { title: 'Year', field: 'semester.yearNum' },
            { title: 'Course Name', field: 'courseName' },
            { title: 'Grade', field: 'finalGrade' },
          ]}
          data={data}
          options={{
            sorting: true,
          }}
        />
      </div>
    </div>
  );
}
