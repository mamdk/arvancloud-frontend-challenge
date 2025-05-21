import styles from './index.module.sass';

interface SectionProps {
	className?: string;
	title: string;
	description?: string;
	children?: any;
}

function Section({ className, children, title, description }: SectionProps) {
	return (
		<section className={styles.section}>
			<header className={styles.headerSection}>
				<h3>{title}</h3>
				{description && <p>{description}</p>}
			</header>

			<div className={styles.content}>{children}</div>
		</section>
	);
}

export default Section;
