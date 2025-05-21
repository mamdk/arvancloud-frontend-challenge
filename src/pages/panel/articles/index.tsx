import styles from './index.module.sass';
import Section from 'src/components/ui/section';
import List from 'src/components/ui/list';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Request from 'src/utils/request';
import { useNavigate, useParams } from 'react-router';

function ArticlesPage() {
	const { page: urlPage } = useParams();
	const navigate = useNavigate();

	const [page, setPage] = useState(parseInt(urlPage || '') || 1);
	const [data, setData] = useState(null as any);

	const { isLoading } = useQuery(
		'articles',
		new Request('/articles').get({
			'Content-Type': 'application/json',
			Authorization: `Token ${localStorage.getItem('user_token')}`,
		}),
		{
			onSuccess: (data) => {
				if (data.articles && data.articlesCount) {
					setData(data);
				}
			},
		}
	);

	const columns = [
		{
			field: 'id',
			title: '#',
			value: (row, index) => <span className={styles.id}>{index + 1}</span>,
		},
		{
			field: 'title',
			title: 'Title',
			value: (row) => <span>{row.title}</span>,
		},
		{
			field: 'author',
			title: 'Author',
			value: (row) => <p>{row?.author?.username ? `@${row.author.username}` : '-'}</p>,
		},
		{
			field: 'tagList',
			title: 'Tags',
			value: (row) => <p>{row.tagList.join(', ')}</p>,
		},
		{
			field: 'body',
			title: 'Excerpt',
			value: (row) => <p>{row.body.split(' ').slice(0, 20).join(' ').replace('\\n', ' ')}</p>,
		},
		{
			field: 'createdAt',
			title: 'Created',
		},
		{
			field: '',
			title: '',
			value: (row) => <span>actions</span>,
		},
	];

	return (
		<main className={styles.articlesPage}>
			<Section title={'All Posts'}>
				<List
					className={styles.list}
					page={page}
					setPage={(newPage) => {
						setPage(newPage);
						void navigate(`/panel/articles${newPage === 1 ? '' : `/page/${newPage}`}`);
					}}
					loading={isLoading}
					items={data?.articles}
					itemsCount={data?.articlesCount}
					columns={columns}
				/>
			</Section>
		</main>
	);
}

export default ArticlesPage;
