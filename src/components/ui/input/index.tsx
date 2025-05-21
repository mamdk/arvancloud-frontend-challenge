import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import { toast } from 'react-toastify';
import onChange = toast.onChange;

interface TInputProps {
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
	type?: 'text' | 'password' | 'email' | 'number';
}

export function Input({
	className,
	name,
	value,
	placeholder,
	size = 'md',
	disabled = false,
	readonly = false,
	fullWidth = false,
	type = 'text',
	error = false,
	onChange,
	onInput,
	...otherProps
}: TInputProps) {
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
		<input
			value={value}
			type={type}
			className={cls(
				styles.input,
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
			{...otherProps}
		/>
	);
}

export default Input;
