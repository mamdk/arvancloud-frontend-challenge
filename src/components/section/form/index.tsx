import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import Button from 'src/components/ui/button';
import Container from 'src/components/section/container';

interface TFormProps {
	className?: string;
	children?: any;
	title: string;
	action?: {
		title: string;
		handler: () => void;
		fullWidth?: boolean;
		type?: 'submit' | 'button';
	} | null;
	onSubmit?: (e) => void;
}

function Form({ className, children, action = null, title, onSubmit }: TFormProps) {
	return (
		<form className={cls(styles.form, className)} onSubmit={onSubmit}>
			<header>
				<h3>{title}</h3>
			</header>
			<div className={cls(styles.fields)}>{children}</div>
			{action && (
				<footer>
					<Button type={action.type || 'button'} onClick={action.handler} fullWidth={action.fullWidth}>
						{action.title}
					</Button>
				</footer>
			)}
		</form>
	);
}

export default Form;
