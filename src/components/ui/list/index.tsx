import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import LoadingIndicator from 'src/components/ui/loading_indicator';
import Pagination from 'src/components/ui/pagination';

interface ListProps {
	items: Array<Record<string, any>>;
	itemsCount: number;
	page: number;
	setPage: (newPage: number) => void;
	loading?: boolean;
	columns: any[];
	className?: string;
	disablePagination?: boolean;
}

const RowsPerPage = 11;

const List = ({ items, itemsCount, page, setPage, loading, columns, className, disablePagination }: ListProps) => {
	const generateTable = () => {
		if (!items?.length && loading) {
			return <LoadingIndicator className={styles.loading} />;
		}

		if (items?.length > 0) {
			return (
				<table>
					<thead>
						<tr>
							{columns.map((column, index) => {
								return (
									<th key={`head-${index + 1}`} align={column.align} style={column.props?.style}>
										<span>{column.title}</span>
									</th>
								);
							})}
						</tr>
					</thead>

					<tbody>
						{items.map((row, index) => {
							return (
								<tr tabIndex={-1} key={`row-${index + 1}`}>
									{columns.map(
										({ title, props, align, field, mainTitle, styles: cellStyles = {}, value }, columnIndex) => (
											<td
												className={cls(props?.className, mainTitle && styles.mainTitle)}
												align={align}
												key={`col-${columnIndex + 1}`}
												style={{ ...cellStyles }}
												data-label={title}
											>
												{value instanceof Function ? value(row, index) : value || row[field]}
											</td>
										)
									)}
								</tr>
							);
						})}
					</tbody>
				</table>
			);
		}
	};

	return (
		<section className={cls(styles.list, className)}>
			<div className={styles.contents}>{generateTable()}</div>

			<footer>
				{!disablePagination && !loading && (
					<Pagination
						className={styles.pagination}
						page={page}
						setPage={setPage}
						rowsPerPage={RowsPerPage}
						count={itemsCount}
					/>
				)}
			</footer>
		</section>
	);
};

export default List;
