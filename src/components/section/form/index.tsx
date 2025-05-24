import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import Button from 'src/components/ui/button';
import Section from 'src/components/ui/section';
import LoadingIndicator from 'src/components/ui/loading_indicator';

interface TFormProps {
	className?: string;
	children?: any;
	title: string;
	action?: {
		title: string;
		handler?: () => void;
		fullWidth?: boolean;
		loading?: boolean;
		disabled?: boolean;
		type?: 'submit' | 'button';
	} | null;
	onSubmit?: (e) => void;
	footer?: any;
	loading?: boolean;
}

function Form({ className, children, action = null, title, onSubmit, footer = null, loading = false }: TFormProps) {
	return (
		<form className={cls(styles.form, className)} onSubmit={onSubmit}>
			<Section title={title}>
				{loading ? (
					<div className={styles.loadingSection}>
						<LoadingIndicator />
					</div>
				) : (
					<>
						<div className={cls(styles.fields)}>{children}</div>
						{action && (
							<footer className={cls(footer && styles.hasCustomFooter)}>
								<Button
									type={action.type || 'button'}
									onClick={action.type === 'submit' ? onSubmit : action.handler}
									fullWidth={action.fullWidth}
									loading={action.loading}
									disabled={action.loading || action.disabled}
								>
									{action.title}
								</Button>
							</footer>
						)}
						{footer && <div className={styles.customFooter}>{footer}</div>}
					</>
				)}
			</Section>
		</form>
	);
}

export default Form;
