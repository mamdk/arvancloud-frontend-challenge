import styles from './index.module.sass';
import cls from 'src/utils/class_names';

interface TFieldProps {
	className?: string;
	error?: boolean;
	required?: boolean;
	message?: string;
	label?: string;
	children?: any;
	fullWidth?: boolean;
}

export function Field({ children, className, error = false, message, label, required, fullWidth }: TFieldProps) {
	return (
		<div className={cls(styles.fieldSection, className, fullWidth && styles.fullWidth)}>
			{label && (
				<label className={cls(styles.label)}>
					{label}
					{required && <span>*</span>}
				</label>
			)}
			{children || <div className={cls(styles.replaceMe)}>Replace me</div>}
			{message && <p className={cls(styles.message, error && styles.error)}>{message}</p>}
		</div>
	);
}

export default Field;
