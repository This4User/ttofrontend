import { useCallback, useEffect, useRef } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import s from './Firework.module.css';

const Firework = () => {
	const refAnimationInstance = useRef(null);

	const getInstance = useCallback((instance: any) => {
		refAnimationInstance.current = instance;
	}, []);

	const makeShot = useCallback(() => {
		if (refAnimationInstance.current) {

			// @ts-ignore
			refAnimationInstance.current({
				spread: 360,
				origin: {y: 0.5, x: 0.5},
				particleCount: Math.floor(200 * 0.25),
			});
		}
	}, []);

	const fire = useCallback(() => {

		for (let i = 0; i <= 4; i++) {
			makeShot();
		}

	}, [makeShot]);

	useEffect(fire, [fire]);

	return (
		<div className={s.container}>
			<ReactCanvasConfetti refConfetti={getInstance} className={s.confetti}/>
		</div>
	);
};

export default Firework;
