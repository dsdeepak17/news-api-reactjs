import { createSlice } from '@reduxjs/toolkit';
import { GetNewsArticles, SearchNewsArticles } from './services';

import { Constants } from '../Constants';

const { LOADING, SUCCESS, FAILED } = Constants;

export const initialState = {
	allNewsArticles: [],
	newsArticles: [],
	searchText: '',
	currentPage: 1,
	articlesPerPage: 10,
	searchServer: false,
	status: '',
	error: '',
};
const newsArticlesSlice = createSlice({
	name: 'newsArticles',
	initialState,
	reducers: {
		paginate: (state, action) => {
			state.currentPage = action.payload;
		},
		toggleSearchServer: (state, action) => {
			state.searchServer = !action.payload;
		},
		search: (state, action) => {
			const searchText = action.payload.replace(/[?.,-\\]/g, '');

			let filteredNewsArticles = [...state.allNewsArticles].filter(
				({ title, description }) => {
					let searchTextRegex = new RegExp(searchText, 'i');
					return (
						searchTextRegex.test(title) || searchTextRegex.test(description)
					);
				},
			);

			if (!searchText) {
				state.newsArticles = state.allNewsArticles;
			} else state.newsArticles = filteredNewsArticles;
		},
		sort: (state, action) => {
			const sort = action.payload;
			state.newsArticles = [...state.newsArticles].sort((a, b) =>
				a.publishedAt < b.publishedAt ? sort : -1 * sort,
			);
		},
		setSearchText: (state, action) => {
			state.searchText = action.payload;
		},
	},
	extraReducers: {
		[GetNewsArticles.pending]: (state) => {
			state.status = LOADING;
		},
		[GetNewsArticles.fulfilled]: (state, action) => {
			const sortedArticles = action.payload.articles.sort((a, b) =>
				a.publishedAt < b.publishedAt ? sort : -1 * sort,
			);
			state.newsArticles = sortedArticles;
			state.allNewsArticles = sortedArticles;
			state.status = SUCCESS;
		},
		[GetNewsArticles.rejected]: (state, action) => {
			state.status = FAILED;
			state.error = action.payload;
		},
		[SearchNewsArticles.pending]: (state, action) => {
			state.status = LOADING;
		},
		[SearchNewsArticles.fulfilled]: (state, action) => {
			if (state.allNewsArticles.length) {
				state.status = SUCCESS;
				state.newsArticles = action.payload.articles;
				state.allNewsArticles = action.payload.articles;
			} else state.status = LOADING;
		},
		[SearchNewsArticles.rejected]: (state, action) => {
			state.error = action.payload;
		},
	},
});

export const { search, sort, setSearchText, toggleSearchServer, paginate } =
	newsArticlesSlice.actions;

export default newsArticlesSlice.reducer;
