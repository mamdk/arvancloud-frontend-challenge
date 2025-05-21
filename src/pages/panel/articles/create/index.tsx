import styles from './index.module.sass';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Request from 'src/utils/request';
import { useNavigate } from 'react-router';
import Form from 'src/components/section/form';
import Field from 'src/components/ui/field';
import Input from 'src/components/ui/input';
import Textarea from 'src/components/ui/textarea';
import toast from 'src/components/section/toast';

function ArticleCreatePage() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const [errors, setErrors] = useState({} as any);

	const [data, setData] = useState({
		title: '',
		description: '',
		body: '',
		tags: [],
	});

	function setDataValue(obj) {
		setData({ ...data, ...obj });
	}

	const { mutate, isLoading } = useMutation(
		new Request('/articles').post({
			Authorization: `Token ${localStorage.getItem('user_token')}`,
		}),
		{
			onSuccess: (data) => {
				if (data.errors) {
					setErrors(data.errors);
					toast({ type: 'error', title: 'Create article failed', description: 'data is invalid' });
				} else if (data.article) {
					void queryClient.invalidateQueries('articles');
					setData({ title: '', description: '', body: '', tags: [] });
					toast({ type: 'success', title: 'Well done!', description: 'Article created successfully' });
					void navigate('/panel/articles');
				} else {
					toast({ type: 'error', title: 'Error' });
				}
			},
			onError: (error) => {
				console.error('create article', error);
				toast({ type: 'error', title: 'Create article failed' });
			},
		}
	);

	return (
		<main className={styles.articleCreatePage}>
			<Form
				className={styles.form}
				title={'New article'}
				onSubmit={() => {
					mutate({ article: data });
				}}
				action={{
					loading: isLoading,
					title: 'Submit',
					type: 'submit',
				}}
			>
				<Field label={'Title'} fullWidth error={errors?.title} message={errors?.title}>
					<Input
						placeholder={'Title'}
						fullWidth
						error={errors?.title}
						onChange={(val) => {
							setDataValue({ title: val });
						}}
					/>
				</Field>
				<Field label={'Description'} fullWidth error={errors?.description} message={errors?.description}>
					<Input
						placeholder={'Description'}
						fullWidth
						error={errors?.description}
						onChange={(val) => {
							setDataValue({ description: val });
						}}
					/>
				</Field>
				<Field label={'Body'} fullWidth error={errors?.body} message={errors?.body}>
					<Textarea
						fullWidth
						error={errors?.body}
						onChange={(val) => {
							setDataValue({ body: val });
						}}
					/>
				</Field>
			</Form>

			<section>tags</section>
		</main>
	);
}

export default ArticleCreatePage;
