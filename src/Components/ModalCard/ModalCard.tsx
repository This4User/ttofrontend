import React from 'react';
// @ts-ignore
import s from './ModalCard.module.css'

interface ModalI {
	title: string;
	actionText: string;
	onClick: () => void;
}

const ModalCard = ({title, actionText, onClick }: ModalI) => {
	return (
		<div className={s.card}>
			{
				title
			}
			<button onClick={onClick}>
				{
					actionText
				}
			</button>
		</div>
	);
};

export default ModalCard;