import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import Button from 'src/components/ui/button';
import HeaderSection from 'src/components/ui/header_section';

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
			<HeaderSection title={title} />
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
