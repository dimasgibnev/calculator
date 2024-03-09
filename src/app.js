import styles from './app.module.css';

export const App = () => {
	const NUMS = [];
	for (let i = 0; i < 10; i++) {
		NUMS.push(`${i}`);
	}
	const SYMBOLS = ['+', '-', '='];

	return (
		<>
			<div className={styles.calculator}>
				<div className={styles.calculator__display}></div>
				<div className={styles['calculator__button-container']}>
					<div className={styles['button-container__numbers']}>
						{NUMS.map((e) => (
							<button key={e} className={styles['numbers-button']}>
								{e}
							</button>
						))}
					</div>
					<div className={styles['button-container__symbols']}>
						{SYMBOLS.map((e) => (
							<button className={styles['symbols-button']}>{e}</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
