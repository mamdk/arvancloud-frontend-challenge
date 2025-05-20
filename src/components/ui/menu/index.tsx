import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import Link from 'src/components/ui/link';
import LoadingIndicator from 'src/components/ui/loading_indicator';

type TItems = Array<{
	title: string;
	link?: string;
	handler?: () => void;
	loading?: boolean;
}>;

interface TMenuProps {
	className?: string;
	items?: TItems;
}

export function Menu({ className, items = [] }: TMenuProps) {
	return (
		<ul className={cls(styles.menu, className)}>
			{items?.map((item) => (
				<li
					className={cls(styles.item, item.handler && styles.handler, item.loading && styles.loading)}
					key={item.title}
					onClick={item.handler}
				>
					{item.loading && (
						<div className={styles.loadingWrapper}>
							<LoadingIndicator light /> <span>Loading...</span>
						</div>
					)}
					<div className={styles.info}>
						{item.link ? (
							<Link className={styles.link} to={item.link}>
								{item.title}
							</Link>
						) : (
							<span>{item.title}</span>
						)}
					</div>
				</li>
			))}
		</ul>
	);
}

export default Menu;
