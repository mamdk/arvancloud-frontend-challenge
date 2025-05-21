import styles from './index.module.sass';
import cls from 'src/utils/class_names';

interface TTextareaProps {
	name?: string;
	value?: string | number;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	readonly?: boolean;
	fullWidth?: boolean;
	error?: boolean;
	placeholder?: string;
	onChange?: (value, event) => void;
	onInput?: (value, event) => void;
	rows?: number;
}

export function Textarea({
	className,
	name,
	value,
	placeholder,
	size = 'md',
	disabled = false,
	readonly = false,
	fullWidth = false,
	error = false,
	onChange,
	onInput,
	rows = 5,
}: TTextareaProps) {
	const handleChange = (e) => {
		if (onChange instanceof Function) {
			onChange(e.target.value, e);
		}
	};
	const handleInput = (e) => {
		if (onInput instanceof Function) {
			onInput(e.target.value, e);
		}
	};

	return (
		<textarea
			value={value}
			rows={rows}
			className={cls(
				styles.textarea,
				className,
				styles[size],
				disabled && styles.disabled,
				readonly && styles.readonly,
				fullWidth && styles.fullWidth,
				error && styles.error
			)}
			onChange={handleChange}
			onInput={handleInput}
			placeholder={placeholder}
			name={name}
			disabled={disabled || readonly}
		/>
	);
}

export default Textarea;
