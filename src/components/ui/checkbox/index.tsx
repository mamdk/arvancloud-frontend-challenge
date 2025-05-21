import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import CheckSVG from 'src/assets/icons/checkLight.svg';
import DashSVG from 'src/assets/icons/dash-light.svg';
import { useState } from 'react';

interface TCheckboxProps {
	className?: string;
	disabled?: boolean;
	checked?: boolean;
	value?: boolean | null;
	onChange?: (value) => void;
	indeterminate?: boolean;
}

// TODO: fix bug -> when scroll check stay
export function Checkbox({ className, disabled, onChange, value, checked, indeterminate = false }: TCheckboxProps) {
	const [isChecked, setIsChecked] = useState((indeterminate ? value : !!value) as any);

	const handleCheckboxChange = (e) => {
		e.preventDefault();
		setIsChecked(!isChecked);
		if (onChange instanceof Function) onChange(!isChecked);
	};
	const handleCheckboxContextMenu = (e) => {
		e.preventDefault();
		setIsChecked(isChecked === null ? false : null);
		if (onChange instanceof Function) onChange(isChecked === null ? false : null);
	};

	return (
		<label
			className={cls(
				styles.checkboxSection,
				className,
				disabled && styles.disabled,
				isChecked && styles.checked,
				indeterminate && isChecked === null && styles.indeterminate
			)}
			onContextMenu={(indeterminate && !disabled ? handleCheckboxContextMenu : null) as any}
		>
			<input
				className={cls(styles.checkbox)}
				disabled={disabled}
				type='checkbox'
				checked={checked}
				value={!!isChecked as any}
				onClick={handleCheckboxChange}
			/>
			<CheckSVG className={styles.checkmark} />
			{indeterminate && <DashSVG className={styles.dash} />}
		</label>
	);
}

export default Checkbox;
