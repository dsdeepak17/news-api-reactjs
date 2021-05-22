import React, { useState, useEffect } from 'react';

import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import NewsTable from './NewsTable';
import Pagination from './Pagination';
import SearchComponent from './SearchComponent';

import { useSelector, useDispatch } from 'react-redux';
import { GetNewsArticles } from '../../Redux/services';
import { paginate, sort } from '../../Redux/NewsArticlesSlice';
import { Constants } from '../../Constants';

const { LOADING, SUCCESS } = Constants;

function NewsArticles() {
	const { newsArticles, status, currentPage, articlesPerPage } = useSelector(
		(state) => state.newsArticles,
	);
	const dispatch = useDispatch();

	const [Sort, setSort] = useState(1);
	const toggleSort = () => {
		setSort((prev) => -1 * prev);
		dispatch(sort(Sort));
	};
	//fetches news-headlines on Component Load
	useEffect(() => {
		dispatch(GetNewsArticles());
	}, [dispatch]);

	//Get current articles
	const indexOfLastPost = currentPage * articlesPerPage;
	const indexOfFirstPost = indexOfLastPost - articlesPerPage;
	const currentPosts = newsArticles.slice(indexOfFirstPost, indexOfLastPost);

	return (
		<div className="App">
			<Typography
				variant="h2"
				gutterBottom
				style={{
					padding: '5px 15px',
					color: 'white',
					background: 'grey',
					margin: 3,
				}}
			>
				News Web
			</Typography>
			<br />

			<SearchComponent style={{ textAlign: 'right' }} paginate={paginate} />
			<br />
			{status !== LOADING && <Pagination totalArticles={newsArticles.length} />}
			<br />
			<div style={{ textAlign: 'center' }}>
				{status === LOADING ? (
					<CircularProgress />
				) : status === SUCCESS ? (
					<NewsTable rows={currentPosts} toggleSort={toggleSort} sort={Sort} />
				) : (
					<h2>News Not Received</h2>
				)}
			</div>
			<br />
			{status !== LOADING && <Pagination totalArticles={newsArticles.length} />}
		</div>
	);
}

export default NewsArticles;
