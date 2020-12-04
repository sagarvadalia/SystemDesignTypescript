import React, { useState, useContext, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
import { LoginContext } from '../../LoginContext';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@material-ui/core';
import RegistrationNav from './RegistrationNav'
export default function Registration() {
  const [state, setState] = useContext(LoginContext);
  // async function canAddMajor(majorID) {
  //   axios.get('/')
  // }
  const [data, setData] = useState([{ sID: {} }]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`/api/majors`);

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ maxWidth: '100%' }}>
        <RegistrationNav></RegistrationNav>
      </div>
    </div>
  );
}
