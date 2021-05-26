import { configureStore } from '@reduxjs/toolkit';
import newsArticlesSlice from './NewsArticlesSlice';

export default configureStore({
	reducer: {
		newsArticles: newsArticlesSlice,
	},
});
