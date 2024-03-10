import { useState } from 'react';
import styles from './app.module.css';

export const App = () => {
	const NUMS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
	const SYMBOLS = ['C', '-', '+', '='];
	const [operand1, setOperand1] = useState('');
	const [operand2, setOperand2] = useState('');
	const [operator, setOperator] = useState('');
	let result = 0;
	const localOperator = localStorage.getItem('operator');
	const promiseResult = new Promise(function (resolve, reject) {
		if (operator === '=') {
			resolve();
		}
	});

	const handlePutNumber = ({ target }) => {
		if (operator === '+' || operator === '-') {
			if (operand2 === '0' && target.textContent === '0') {
				setOperand2((prev) => prev + '');
			} else if (operand2 === '0') {
				setOperand2(target.textContent);
			} else {
				setOperand2((prev) => prev + target.textContent);
			}
		} else {
			promiseResult.then(() => {
				setOperand1(target.textContent);
				setOperand2('');
				setOperator('');
			});
			if (operand1 === '0' && target.textContent === '0') {
				setOperand1((prev) => prev + '');
			} else if (operand1 === '0') {
				setOperand1(target.textContent);
			} else {
				setOperand1((prev) => prev + target.textContent);
			}
		}
	};

	const handlePutSymbol = ({ target }) => {
		setOperator(target.textContent);
		promiseResult.then(() => {
			setOperand1(result);
			setOperand2('');
			setOperator(target.textContent);
		});
	};

	if (operator === 'C') {
		setOperand1('');
		setOperand2('');
		setOperator('');
	} else if (operator === '=') {
	} else {
		localStorage.setItem('operator', operator);
	}

	switch (localOperator) {
		case '+': {
			result = Math.floor(+operand1 + +operand2);
			break;
		}
		case '-': {
			result = Math.floor(+operand1 - +operand2);
			break;
		}
		default:
			break;
	}

	return (
		<>
			<div className={styles.calculator}>
				<div
					className={
						styles.display + (operator === '=' ? ' ' + styles.result : '')
					}
				>
					<span className={styles['display-content']}>
						{operator === '='
							? result
							: `${operand1} ${operator} ${operand2}`}
					</span>
				</div>
				<div className={styles['button-container']}>
					<div className={styles['button-container__numbers']}>
						{NUMS.map((e) => (
							<button
								key={e}
								className={styles['button-numbers']}
								onClick={handlePutNumber}
							>
								{e}
							</button>
						))}
					</div>
					<div className={styles['button-container__symbols']}>
						{SYMBOLS.map((e) => (
							<button
								key={e}
								className={styles['button-symbols']}
								onClick={handlePutSymbol}
							>
								{e}
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
};
