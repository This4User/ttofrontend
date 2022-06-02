import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css';
import Game from './Containers/Game';
import Start from './Containers/Start';

const App = () => {
	return (
		<BrowserRouter>
			<div>
				<Routes>
					<Route path="/game" element={<Game/>}/>
					<Route path="/" element={<Start/>}/>
				</Routes>
			</div>
		</BrowserRouter>
	);
};

export default App;
