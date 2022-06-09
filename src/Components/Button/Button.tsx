import React from 'react';
import s from './Button.module.css';

type ButtonType = {
	text?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;
	isAnimation?: boolean;
}

const Button: React.FunctionComponent<ButtonType> = ({text, onClick, children, isAnimation}) => {
	return (
		<button
			className={!isAnimation ? s.button : s.buttonToBoard}
			onClick={onClick}
		>
			{
				text
			}
			{
				children
			}
		</button>
	);
};

export default Button;