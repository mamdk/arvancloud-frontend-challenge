import { useEffect, useMemo, useState } from 'react';
import styles from './index.module.sass';
import cls from 'src/utils/class_names';
import LeftSVG from 'src/assets/icons/chevron-left-light.svg';
import RightSVG from 'src/assets/icons/chevron-right-light.svg';

interface PaginationProps {
	page: number;
	setPage: (page) => void;
	rowsPerPage: number;
	count: number;
	className?: string;
	disabled?: boolean;
}

function Pagination({ page, setPage, count, rowsPerPage, disabled, className = '' }: PaginationProps) {
	const [pageCount, setPageCount] = useState(0);

	useEffect(() => {
		const pageCountValue = Math.ceil(count / rowsPerPage);
		setPageCount(pageCountValue);
	}, [count]);

	const pages = useMemo(() => {
		if (pageCount > 5) {
			const firstSpace = page - 1 > 2;
			const secondSpace = pageCount - page > 2;
			return [
				1,
				...[firstSpace && '...'],
				...[page - 1 !== 0 && page - 1 !== 1 && page - 1],
				...[page !== 1 && page !== pageCount && page],
				...[page + 1 !== pageCount && page + 1 < pageCount && page + 1],
				...[secondSpace && '...'],
				pageCount,
			].filter(Boolean);
		} else if (pageCount <= 5 && pageCount > 0) {
			return new Array(pageCount).fill(null).map((_, i) => i + 1);
		}

		return [];
	}, [pageCount, page]);

	return (
		<div className={cls(styles.pagination, className, disabled && styles.disabled)}>
			<button
				className={cls(styles.icon, page === 1 && styles.disabled)}
				onClick={() => {
					setPage(page - 1);
				}}
			>
				<LeftSVG />
			</button>
			{pages.map((p, index) => (
				<button
					key={`page-${p}-${index}`}
					className={cls(styles.page, page === p && styles.selected, typeof p === 'string' && styles.space)}
					onClick={() => {
						setPage(p);
					}}
				>
					{p}
				</button>
			))}
			<button
				className={cls(styles.icon, page === pageCount && styles.disabled)}
				onClick={() => {
					setPage(page + 1);
				}}
			>
				<RightSVG />
			</button>
		</div>
	);
}

export default Pagination;
