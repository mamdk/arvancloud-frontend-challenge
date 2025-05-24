import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import LoadingIndicator from 'src/components/ui/loading_indicator';

interface TButtonProps {
	className?: string;
	disabled?: boolean;
	loading?: boolean;
	hasIcon?: boolean;
	fullWidth?: boolean;
	variant?: 'primary' | 'secondary';
	color?: 'success' | 'error';
	type?: 'button' | 'submit' | 'reset';
	onClick?: (event) => void;
	children?: any;
}

export function Button({
	className,
	disabled = false,
	loading = false,
	hasIcon = false,
	fullWidth = false,
	variant = 'primary',
	color = 'success',
	type = 'button',
	onClick,
	children,
}: TButtonProps) {
	const handleButtonClick = (e) => {
		e.preventDefault();
		if (onClick instanceof Function) onClick(e);
	};

	return (
		<button
			type={type}
			className={cls(
				styles.button,
				className,
				disabled && styles.disabled,
				variant === 'primary' ? styles.primary : styles.secondary,
				color === 'success' ? styles.success : styles.error,
				loading && styles.loading,
				hasIcon && styles.hasIcon,
				fullWidth && styles.fullWidth
			)}
			onClick={disabled ? undefined : handleButtonClick}
			disabled={disabled}
		>
			{loading ? <LoadingIndicator light={variant === 'secondary'} /> : children}
		</button>
	);
}

export default Button;
