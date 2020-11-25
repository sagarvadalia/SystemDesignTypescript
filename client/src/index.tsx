import * as React from "react";
import ReactDOM, { render } from "react-dom";
import App from './App';
import { Router } from 'react-router-dom';
import history from './history'
import { Users } from "../server/entity/Users/Users";
import { useEffect } from "react";
import axios from 'axios';
const defaultTheme = undefined;
type ThemeContextType = {
  theme: Users | undefined;
  setTheme: (value: Users | undefined) => void;
};
const ThemeContext = React.createContext<ThemeContextType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};
export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = React.useState<Users | undefined>(defaultTheme);
  const [data, setData] = React.useState({ users: Array<Users>() });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/users');
        const data: Array<Users> = result.data
        setData({ users: data });
        setTheme(data[0])
        console.log(data)
        return data
      } catch (error) {
        console.error(error);
      }
    };

    console.log(fetchData(), '-----------------');



  }, []);


  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => React.useContext(ThemeContext);

export const Header = () => {

  const { theme, setTheme } = useTheme()!;

  console.log(theme);

  return (

    <div>
      {JSON.stringify(theme)}
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
    </Router>

  </React.StrictMode>,
  document.getElementById('root')
);
