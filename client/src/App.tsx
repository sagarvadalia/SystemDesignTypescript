import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Users } from '../server/entity/Users/Users';
import Schedule from './client/components/schedule';
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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.

          <Schedule></Schedule>
        </p>

        <pre>
          <p >
            {JSON.stringify(data)}
          </p>

        </pre>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
