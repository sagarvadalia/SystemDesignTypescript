import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Users } from '../server/entity/Users/Users';
import Schedule from './client/components/schedule';
import Navbar from './client/components/navbar';
import { Login } from './client/components/login';
import { Routes } from './client/components/routes';
function App() {
  const [data, setData] = useState({ users: Array<Users>() });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/users/');
        const data: Array<Users> = result.data
        setData({ users: data });
        console.log(data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    console.log(data);
    console.log(data?.users[0]?.userID)
  }, []);

  return (
    <div className="App">




      <Navbar></Navbar>
      <Routes></Routes>

      {/* <Schedule></Schedule> */}

      {/* <Login></Login> */}

      {/* <pre>
          <p >
            {JSON.stringify(data)}
          </p>

        </pre> */}


    </div>
  );
}

export default App;
