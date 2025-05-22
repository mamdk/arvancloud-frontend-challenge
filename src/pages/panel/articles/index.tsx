import styles from './index.module.sass';
import Section from 'src/components/ui/section';
import List from 'src/components/ui/list';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Request from 'src/utils/request';
import { useNavigate, useParams } from 'react-router';
import Button from 'src/components/ui/button';
import EllipsisSVG from 'src/assets/icons/ellipsis-light.svg';
import Popover from 'src/components/ui/popover';
import Menu from 'src/components/ui/menu';
import toast from 'src/components/section/toast';
import Modal from 'src/components/section/modal';

function ArticlesPage() {
	const queryClient = useQueryClient();
	const { page: urlPage } = useParams();
	const navigate = useNavigate();

	const [page, setPage] = useState(parseInt(urlPage || '0') || 1);
	const [data, setData] = useState(null as any);
	const [popoverOpen, setPopoverOpen] = useState(false);
	const [deleteArticle, setDeleteArticle] = useState(null as any);

	const { isLoading, isFetching, refetch } = useQuery(
		'articles',
		new Request(`/articles${page > 1 ? `?page=${page}&rowPerPage=11` : ''}`).get({
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

	const { mutate: deleteMutate, isLoading: deletedLoading } = useMutation(
		new Request(`/articles/{{slug}}`).delete({
			Authorization: `Token ${localStorage.getItem('user_token')}`,
		}),
		{
			onSuccess: (data) => {
				if (data.status === 204) {
					void queryClient.invalidateQueries('articles');
					toast({ type: 'success', description: 'Article deleted successfully' });
					void refetch();
					setDeleteArticle(null);
				} else {
					toast({ type: 'error', title: 'Delete article failed' });
				}
			},
			onError: (error) => {
				console.error('delete article', error);
				toast({ type: 'error', title: 'Delete article failed' });
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
			value: (row) => <p>{row.createdAt}</p>,
		},
		{
			field: '',
			title: '',
			value: (row) => (
				<Popover
					open={popoverOpen}
					setOpen={setPopoverOpen}
					position={'bottom'}
					className={styles.popover}
					trigger={
						<Button variant={'secondary'} hasIcon>
							<EllipsisSVG />
						</Button>
					}
				>
					<Menu
						items={[
							{ title: 'Edit', link: `/panel/articles/edit/${row.slug}` },
							{
								title: 'Delete',
								handler: () => {
									setPopoverOpen(false);
									setDeleteArticle(row);
								},
							},
						]}
					/>
				</Popover>
			),
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
					loading={isLoading || isFetching}
					items={data?.articles}
					itemsCount={data?.articlesCount}
					columns={columns}
				/>
			</Section>

			<Modal
				open={deleteArticle}
				title={'Delete Article'}
				dialogueOptions={{ type: 'error', message: 'Are you sure you want to delete this article?' }}
				actions={
					<>
						<Button
							color={'error'}
							onClick={() => {
								deleteMutate(deleteArticle.slug);
							}}
							loading={deletedLoading}
						>
							Delete
						</Button>
						<Button
							variant={'secondary'}
							onClick={() => {
								setDeleteArticle(null);
							}}
						>
							Cancel
						</Button>
					</>
				}
			/>
		</main>
	);
}

export default ArticlesPage;
