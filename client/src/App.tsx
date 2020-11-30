import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Users } from '../server/entity/Users/Users';
import Schedule from './client/components/schedule';
import Navbar from './client/components/navbar';
import { Login } from './client/components/login';
import { Routes } from './client/components/routes';
import { Header, ThemeProvider } from './index';
import StudentTranscript from './client/components/studentTranscript';
function App() {
  // const [data, setData] = useState({ users: Array<Users>() });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await axios.get('/api/users/');
  //       const data: Array<Users> = result.data
  //       setData({ users: data });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchData();

  // }, []);

  return (


    <ThemeProvider>
      <div className="App">


        <Header></Header>

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
    </ThemeProvider>

  );
}

export default App;
