import styles from './index.module.sass';
import cls from 'src/utils/class_names';

interface TInputProps {
	name: string;
	value?: string | number;
	className?: string;
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	readonly?: boolean;
	error?: boolean;
	placeholder?: string;
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
	type = 'text',
	error = false,
}: TInputProps) {
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
				error && styles.error
			)}
			placeholder={placeholder}
			name={name}
			disabled={disabled || readonly}
		/>
	);
}

export default Input;
