import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Button/Button';

const Start = () => {

	const [isAnimation, setIsAnimation] = useState<boolean>(false);

	const navigate = useNavigate();

	const navigateToGame = () => {
		setIsAnimation(true);

		setTimeout(() => {
			navigate('/game');
		}, 1000);
	};

	return (
		<div>
			<Button
				isAnimation={isAnimation}
				onClick={navigateToGame}
			>
				Connect
			</Button>

		</div>
	);
};

export default Start;