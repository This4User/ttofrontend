import React from 'react';
import s from './Title.module.css';

type TitleProps = {
	children: React.ReactNode;
}

const Title: React.FunctionComponent<TitleProps> = ({children}) => {
	return (
		<div className={s.title}>
			{children}
		</div>
	);
};

export default Title;