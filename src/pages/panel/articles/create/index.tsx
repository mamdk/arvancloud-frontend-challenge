import styles from './index.module.sass';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Request from 'src/utils/request';
import { useNavigate } from 'react-router';
import Form from 'src/components/section/form';
import Field from 'src/components/ui/field';
import Input from 'src/components/ui/input';
import Textarea from 'src/components/ui/textarea';
import toast from 'src/components/section/toast';
import Checkbox from 'src/components/ui/checkbox';
import LoadingIndicator from 'src/components/ui/loading_indicator';

function ArticleCreatePage() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const [errors, setErrors] = useState({} as any);

	const [newTag, setNewTag] = useState(null);
	const [tagList, setTagList] = useState([] as string[]);
	const [selectedTags, setSelectedTags] = useState([] as string[]);

	const [data, setData] = useState({
		title: '',
		description: '',
		body: '',
	});

	function setDataValue(obj) {
		setData({ ...data, ...obj });
	}

	function handleKeyPress(e) {
		if (e.key === 'Enter' && newTag) {
			setTagList([newTag, ...tagList]);
			setSelectedTags([newTag, ...selectedTags]);
			setNewTag(null);
		}
	}
	const handleChangeCheckbox = (tag, value) => {
		if (value) {
			setSelectedTags([...selectedTags, tag]);
		} else {
			setSelectedTags((currentList) => currentList.filter((t) => t !== tag));
		}
	};

	const { isLoading: tagsLoading, isFetching: tagsFetching } = useQuery(
		'tags',
		new Request('/tags').get({
			'Content-Type': 'application/json',
			Authorization: `Token ${localStorage.getItem('user_token')}`,
		}),
		{
			onSuccess: (data) => {
				if (data.tags) {
					const tags = data.tags.sort();
					setTagList([...new Set([...tagList, ...tags])].sort());
				}
			},
		}
	);

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
					setData({ title: '', description: '', body: '' });
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
					mutate({ article: { ...data, tagList: selectedTags } });
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

			<section className={styles.tagsSection}>
				<Field label={'Tags'} fullWidth>
					<Input
						value={newTag || ''}
						placeholder={'New tag'}
						fullWidth
						onKeyPress={handleKeyPress}
						onChange={(value) => {
							setNewTag(value);
						}}
					/>
				</Field>

				{(tagsLoading || tagsFetching) && tagList?.length === 0 && <LoadingIndicator className={styles.loadingTags} />}

				{tagList?.length > 0 && (
					<ul className={styles.list}>
						{/* TODO: fix overflow -> add many of them and see page */}
						{tagList.map((tag, index) => (
							<li key={`tag-list-${tag}-${index}`}>
								<label className={styles.item}>
									<Checkbox
										value={selectedTags.includes(tag)}
										onChange={(value) => {
											handleChangeCheckbox(tag, value);
										}}
									/>
									<span>{tag}</span>
								</label>
							</li>
						))}
					</ul>
				)}
			</section>
		</main>
	);
}

export default ArticleCreatePage;
