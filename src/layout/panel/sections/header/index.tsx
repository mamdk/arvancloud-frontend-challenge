import Button from 'src/components/ui/button';
import { useAuth } from 'src/contexts/auth';
import cls from 'src/utils/class_names';
import styles from './index.module.sass';
import { useNavigate } from 'react-router';
import BarsSVG from 'src/assets/icons/bars-light.svg';
import XSVG from 'src/assets/icons/x-light.svg';

function Header({ className, openSidebar, setOpenSidebar }) {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	return (
		<header className={cls(styles.header, className)}>
			<span className={styles.welcome}>
				{openSidebar ? (
					<XSVG className={styles.burgerMenu} onClick={() => setOpenSidebar(false)} />
				) : (
					<BarsSVG className={styles.burgerMenu} onClick={() => setOpenSidebar(true)} />
				)}
				Welcome <b>{user.username}</b>
			</span>
			{/* TODO: not center */}
			<p className={styles.middleText}>Arvancloud Challenge</p>
			<Button
				variant={'secondary'}
				onClick={() => {
					logout();
					void navigate('/');
				}}
			>
				Log out
			</Button>
		</header>
	);
}

export default Header;
