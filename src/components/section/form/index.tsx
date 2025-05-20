import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import Button from 'src/components/ui/button';

interface TFormProps {
	className?: string;
	children?: any;
	title: string;
	action?: {
		title: string;
		handler?: () => void;
		fullWidth?: boolean;
		loading?: boolean;
		type?: 'submit' | 'button';
	} | null;
	onSubmit?: (e) => void;
	footer?: any;
}

function Form({ className, children, action = null, title, onSubmit, footer = null }: TFormProps) {
	return (
		<form className={cls(styles.form, className)} onSubmit={onSubmit}>
			<header>
				<h3>{title}</h3>
			</header>
			<div className={cls(styles.fields)}>{children}</div>
			{action && (
				<footer className={cls(footer && styles.hasCustomFooter)}>
					<Button
						type={action.type || 'button'}
						onClick={action.type === 'submit' ? onSubmit : action.handler}
						fullWidth={action.fullWidth}
						loading={action.loading}
					>
						{action.title}
					</Button>
				</footer>
			)}
			{footer && <div className={styles.customFooter}>{footer}</div>}
		</form>
	);
}

export default Form;
