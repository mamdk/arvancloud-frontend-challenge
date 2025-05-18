import styles from './index.module.sass';
import { Outlet } from 'react-router-dom';

function AuthLayout() {
	return (
		<main className={styles.authLayout}>
			<Outlet />
		</main>
	);
}

export default AuthLayout;
