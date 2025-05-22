import styles from './index.module.sass';
import { useState } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import Request from 'src/utils/request';
import { useNavigate, useParams } from 'react-router';
import Form from 'src/components/section/form';
import Field from 'src/components/ui/field';
import Input from 'src/components/ui/input';
import Textarea from 'src/components/ui/textarea';
import toast from 'src/components/section/toast';
import Checkbox from 'src/components/ui/checkbox';
import LoadingIndicator from 'src/components/ui/loading_indicator';

function ArticleEditPage() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { slug } = useParams();

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
			setTagList([...new Set([newTag, ...tagList])].sort());
			setSelectedTags((currentList) => [newTag, ...currentList]);
			setNewTag(null);
		}
	}
	const handleChangeCheckbox = (tag, value) => {
		if (value) {
			setSelectedTags((currentList) => [...currentList, tag]);
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
					setTagList((currentList) => [...new Set([...currentList, ...data.tags])].sort());
				}
			},
		}
	);

	const { isLoading: articleLoading, isFetching: articleFetching } = useQuery(
		'article',
		new Request(`/articles/${slug}`).get({
			'Content-Type': 'application/json',
			Authorization: `Token ${localStorage.getItem('user_token')}`,
		}),
		{
			onSuccess: (data) => {
				if (data.article) {
					setData({
						body: data.article.body,
						title: data.article.title,
						description: data.article.title,
					});
					setSelectedTags((currentList) => [...currentList, ...data.article.tagList]);

					if (data.article.tagList.some((t) => !tagList.includes(t))) {
						setTagList((currentList) => [...new Set([...currentList, ...data.article.tagList])].sort());
					}
				} else {
					console.log(data);
					toast({
						type: 'error',
						title: 'Fail',
						description: 'An error was encountered in the content of the article in question.',
					});
				}
			},
		}
	);

	const { mutate: editMutate, isLoading: editLoading } = useMutation(
		new Request(`/articles/${slug}`).put({
			Authorization: `Token ${localStorage.getItem('user_token')}`,
		}),
		{
			onSuccess: (data) => {
				if (data.errors) {
					setErrors(data.errors);
					toast({ type: 'error', title: 'Edit article failed', description: 'data is invalid' });
				} else if (data.article) {
					void queryClient.invalidateQueries('articles');
					toast({ type: 'success', title: 'Well done!', description: 'Article edited successfully' });
					void navigate('/panel/articles');
				} else {
					toast({ type: 'error', title: 'Error' });
				}
			},
			onError: (error) => {
				console.error('edit article', error);
				toast({ type: 'error', title: 'Edit article failed' });
			},
		}
	);

	const tagsSectionLoading = tagsLoading || tagsFetching || articleLoading || articleFetching;

	return (
		<main className={styles.articleEditPage}>
			<Form
				className={styles.form}
				title={'Article'}
				onSubmit={() => {
					editMutate({ article: { ...data, tagList: selectedTags } });
				}}
				action={
					articleLoading || articleFetching
						? null
						: {
								loading: editLoading,
								title: 'Submit',
								type: 'submit',
							}
				}
			>
				{articleLoading || articleFetching ? (
					<LoadingIndicator className={styles.loading} />
				) : (
					<>
						<Field label={'Title'} fullWidth error={errors?.title} message={errors?.title}>
							<Input
								value={data.title}
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
								value={data.description}
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
								value={data.body}
								fullWidth
								error={errors?.body}
								onChange={(val) => {
									setDataValue({ body: val });
								}}
							/>
						</Field>
					</>
				)}
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

				{tagsSectionLoading && <LoadingIndicator className={styles.loading} />}

				{tagList?.length > 0 && !tagsSectionLoading && (
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

export default ArticleEditPage;
