import cls from 'src/utils/class_names';
import styles from './index.module.sass';
import Menu from 'src/components/ui/menu';
import PanelNavLinks from 'src/data/panel/navlink';
import { useLocation } from 'react-router';
import { useMemo } from 'react';

function Sidebar({ className, open, setOpenSidebar }) {
	const location = useLocation();

	const navLinks = useMemo(() => {
		if (PanelNavLinks) {
			return PanelNavLinks.map((navLink) => ({ ...navLink, active: navLink.link === location.pathname }));
		}

		return [];
	}, [location.pathname]);

	return (
		<>
			<div className={cls(styles.backSidebar, open && styles.open)} onClick={() => setOpenSidebar(false)} />
			<aside className={cls(styles.sidebar, className, open && styles.open)}>
				<Menu items={navLinks} isSidebar />
			</aside>
		</>
	);
}

export default Sidebar;
