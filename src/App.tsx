import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Game from './Containers/Game';
import Start from './Containers/Start';

const App = () => {
	return (
		<HashRouter>
			<div>
				<Routes>
					<Route path="/game" element={<Game/>}/>
					<Route path="/" element={<Start/>}/>
				</Routes>
			</div>
		</HashRouter>
	);
};

export default App;
