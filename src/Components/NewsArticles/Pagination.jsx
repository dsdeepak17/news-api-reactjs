import React from 'react';
import Button from '@material-ui/core/Button';

import { useSelector, useDispatch } from 'react-redux';

import { paginate } from '../../Redux/NewsArticlesSlice';

const Pagination = ({ totalArticles }) => {
	const { currentPage, articlesPerPage } = useSelector(
		(state) => state.newsArticles,
	);

	const dispatch = useDispatch();

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
		pageNumbers.push(i);
	}

	const selectPage = (pageNum) => {
		dispatch(paginate(pageNum));
	};

	return (
		<div style={{ margin: '2px 20px' }}>
			<div>
				{pageNumbers.map((pageNum) => {
					return (
						<Button
							onClick={() => {
								selectPage(pageNum);
							}}
							variant="outlined"
							size="small"
							color={currentPage === pageNum ? 'secondary' : 'default'}
							style={{ borderRadius: 0, padding: 0, margin: 0 }}
							key={pageNum}
						>
							{pageNum}
						</Button>
					);
				})}
			</div>
		</div>
	);
};

export default Pagination;
