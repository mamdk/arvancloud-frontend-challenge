import Button from 'src/components/ui/button';
import { useAuth } from 'src/contexts/auth';
import cls from 'src/utils/class_names';
import styles from './index.module.sass';
import Container from 'src/components/section/container';
import { useNavigate } from 'react-router';

function Header({ className }) {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	return (
		<header className={cls(styles.header, className)}>
			<span className={styles.welcome}>
				Welcome <b>{user.username}</b>
			</span>
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
