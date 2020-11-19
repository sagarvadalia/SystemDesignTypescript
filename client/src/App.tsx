import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Users } from '../server/entity/Users/Users';
function App() {
  const [data, setData] = useState({ users: Array<Users>() });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        '/users',
      );
      const data: Array<Users> = result.data
      setData({ users: data });
      console.log(data)
    };

    fetchData();
    console.log(data);
    console.log(data.users[0].userID)
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
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
