import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import Button from 'src/components/ui/button';

interface THeaderSectionProps {
	className?: string;
	title: string;
}

function HeaderSection({ className, title }: THeaderSectionProps) {
	return (
		<header className={styles.headerSection}>
			<h3>{title}</h3>
		</header>
	);
}

export default HeaderSection;
