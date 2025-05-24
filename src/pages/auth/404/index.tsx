import { Helmet } from 'react-helmet';

function NotFoundPage() {
	return (
		<main>
			<Helmet>
				<title>Not Found | Arvan Challenge</title>
			</Helmet>
			<div className='status'>Not Found</div>
		</main>
	);
}

export default NotFoundPage;
