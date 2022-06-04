import React from 'react';
import s from './Button.module.css';

type ButtonType = {
	text?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	children?: React.ReactNode;

}

const Button: React.FunctionComponent<ButtonType> = ({text, onClick, children}) => {
	return (
		<button
			className={s.button}
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