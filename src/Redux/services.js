<<<<<<< HEAD
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Constants } from '../Constants';

const {
	API_URL,
	HEADLINES_ENDPOINT,
	EVERYTHING_ENDPOINT,
	COUNTRY,
	API_KEY,
	PAGE_SIZE,
} = Constants;

export const GetNewsArticles = createAsyncThunk(
	'newsArticles/getNewsArticles',
	async () => {
		const res = await axios
			.get(
				`${API_URL}/${HEADLINES_ENDPOINT}?country=${COUNTRY}&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}`,
			)
			.catch((error) => console.log(error.toJSON()));
		console.log(res.data);
		return res.data;
	},
);

export const SearchNewsArticles = createAsyncThunk(
	'newsArticles/searchNewsArticles',
	async (dummy, { getState, signal }) => {
		const { allNewsArticles, searchText } = getState().newsArticles;
		const source = axios.CancelToken.source();

		signal.addEventListener('abort', () => {
			source.cancel();
		});

		if (searchText === '') {
			const data = {
				articles: allNewsArticles,
			};
			return data;
		}

		const searchRes = await axios
			.get(
				`${API_URL}/${EVERYTHING_ENDPOINT}?q=${encodeURIComponent(
					searchText.replace(/[?.,-\\]/g, ''),
				)}&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}`,
				{
					cancelToken: source.token,
				},
			)
			.catch((error) => console.log(error.toJSON()));

		console.log('fetched result for ', searchText);
		console.log(searchRes.data, searchText);
		return searchRes.data;
	},
);
=======
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { Constants } from '../Constants';

const {
	API_URL,
	HEADLINES_ENDPOINT,
	EVERYTHING_ENDPOINT,
	COUNTRY,
	API_KEY,
	PAGE_SIZE,
} = Constants;

export const GetNewsArticles = createAsyncThunk(
	'newsArticles/getNewsArticles',
	async () => {
		const res = await axios
			.get(
				`${API_URL}/${HEADLINES_ENDPOINT}?country=${COUNTRY}&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}`,
			)
			.catch((error) => console.log(error.toJSON()));
		console.log(res.data);
		return res.data;
	},
);

export const SearchNewsArticles = createAsyncThunk(
	'newsArticles/searchNewsArticles',
	async (dummy, { getState, signal }) => {
		const { allNewsArticles, searchText } = getState().newsArticles;
		const source = axios.CancelToken.source();

		signal.addEventListener('abort', () => {
			source.cancel();
		});

		if (searchText === '') {
			const data = {
				articles: allNewsArticles,
			};
			return data;
		}

		const searchRes = await axios
			.get(
				`${API_URL}/${EVERYTHING_ENDPOINT}?q=${encodeURIComponent(
					searchText.replace(/[?.,-\\]/g, ''),
				)}&apiKey=${API_KEY}&pageSize=${PAGE_SIZE}`,
				{
					cancelToken: source.token,
				},
			)
			.catch((error) => console.log(error.toJSON()));

		console.log('fetched result for ', searchText);
		console.log(searchRes.data, searchText);
		return searchRes.data;
	},
);
>>>>>>> 1a0f0523728dbf9536543c28a5421e64850c7271
