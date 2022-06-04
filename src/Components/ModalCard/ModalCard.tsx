import React from 'react';
import Button from '../Button/Button';
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
			<Button onClick={onClick}>
				{
					actionText
				}
			</Button>
		</div>
	);
};

export default ModalCard;