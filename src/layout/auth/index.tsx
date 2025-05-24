import styles from './index.module.sass';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function AuthLayout() {
	return (
		<main className={styles.authLayout}>
			<Outlet />
			<ToastContainer />
		</main>
	);
}

export default AuthLayout;
