import { toast as toastGenerator } from 'react-toastify';
import styles from './index.module.sass';
import cls from 'src/utils/class_names';

interface TToastProps {
	type?: 'success' | 'error';
	title?: string;
	description?: string;
	className?: string;
}

function toast({ type, title, description, className }: TToastProps) {
	// TODO: responsive
	toastGenerator(
		<div className={styles.toast}>
			{title && <h4>{title}</h4>}
			{description && <p>{description}</p>}
		</div>,
		{
			position: 'top-center',
			autoClose: 5000,
			closeButton: false,
			hideProgressBar: true,
			className: cls(styles.toastSection, type === 'success' ? styles.success : styles.error, className),
		}
	);
}

export default toast;
