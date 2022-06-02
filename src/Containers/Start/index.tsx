import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const Start = () => {
	return (
		<div>
			<Button>
				<Link to="/game">Connect</Link>
			</Button>

		</div>
	);
};

export default Start;