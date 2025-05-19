import Button from 'src/components/ui/button';
import { useAuth } from 'src/contexts/auth';
import cls from 'src/utils/class_names';
import styles from './index.module.sass';
import Container from 'src/components/section/container';

function Header({ className }) {
	const { user, logout } = useAuth();

	return (
		<header className={cls(styles.header, className)}>
			<Container className={styles.container}>
				<span className={styles.welcome}>
					Welcome <b>{user.name}</b>
				</span>
				<p className={styles.middleText}>Arvancloud Challenge</p>
				<Button variant={'secondary'} onClick={logout}>
					Log out
				</Button>
			</Container>
		</header>
	);
}

export default Header;
