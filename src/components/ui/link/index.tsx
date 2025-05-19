import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import { Link as ReactLink } from 'react-router-dom';

interface TLinkProps {
	className?: string;
	disabled?: boolean;
	children?: any;
	to: string;
}

export function Link({ className, disabled = false, to, children }: TLinkProps) {
	return (
		<div className={cls(styles.linkSection, disabled && styles.disabled)}>
			{to.startsWith('http') ? <a href={to}>{children}</a> : <ReactLink to={to}>{children}</ReactLink>}
		</div>
	);
}

export default Link;
