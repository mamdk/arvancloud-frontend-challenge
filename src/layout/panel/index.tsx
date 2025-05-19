import styles from './index.module.sass';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'src/contexts/auth';
import { useNavigate } from 'react-router';
// import Sidebar from 'src/layout/panel/sections/sidebar';
import Header from 'src/layout/panel/sections/header';

function PanelLayout() {
	const { user } = useAuth();

	const navigate = useNavigate();

	// TODO
	// useEffect(() => {
	// 	const refreshToken = localStorage.getItem('refresh_token');
	//
	// 	if (!checkJWT(refreshToken)) {
	// 		navigate('/auth/login');
	// 	}
	// }, []);

	return (
		<main className={styles.panel}>
			{user && (
				<>
					{/* <Sidebar className={styles.sidebar} /> */}

					<Header className={styles.header} />

					<div className={styles.container}>
						<Outlet />
					</div>
				</>
			)}
		</main>
	);
}

export default PanelLayout;
