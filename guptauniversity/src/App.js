import logo from './logo.svg';
import './App.css';
import { LoginProvider } from './LoginContext';
import Navbar from './components/navbar';
import { Routes } from './components/routes';
function App() {
	return (
		<div className="App">
			<LoginProvider>
				<Navbar></Navbar>
				<Routes></Routes>
			</LoginProvider>
		</div>
	);
}

export default App;
