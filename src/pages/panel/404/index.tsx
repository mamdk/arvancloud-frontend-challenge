import styles from './index.module.sass';
import { Helmet } from 'react-helmet';

function NotFoundPage() {
	return (
		<main className={styles.notFoundPage}>
			<Helmet>
				<title>Not Found | Arvan Challenge</title>
			</Helmet>
			Not Fount Panel
		</main>
	);
}

export default NotFoundPage;
