import React, { useRef, useEffect } from 'react';

import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';

import { useSelector, useDispatch } from 'react-redux';
import { SearchNewsArticles } from '../../Redux/services';
import {
	search,
	setSearchText,
	toggleSearchServer,
} from '../../Redux/NewsArticlesSlice';

const SearchComponent = ({ paginate }) => {
	const { searchText, searchServer } = useSelector(
		(state) => state.newsArticles,
	);
	const dispatch = useDispatch();

	const toggleSearch = () => {
		dispatch(toggleSearchServer(searchServer));
	};

	const searchRef = useRef('');

	useEffect(() => {
		searchRef.current.focus();
	}, [searchServer]);

	const searchFunction = (searchWord) => {
		if (searchServer) dispatch(setSearchText(searchWord));
		else dispatch(search(searchWord));

		paginate(1);
	};

	//Calls the API with SearchWord
	useEffect(() => {
		const promise = dispatch(SearchNewsArticles());
		paginate(1);

		return () => {
			// console.log('promise aborted for', searchText);
			promise.abort();
		};
		// eslint-disable-next-line
	}, [searchText, dispatch]);

	return (
		<div style={{ textAlign: 'right', margin: 'auto' }}>
			<TextField
				inputRef={searchRef}
				onChange={(e) => searchFunction(e.target.value)}
				label={searchServer ? 'Search News Server' : 'Search this Website'}
				size="small"
				variant="outlined"
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
			<Switch size="medium" onChange={toggleSearch} />
		</div>
	);
};

export default SearchComponent;
