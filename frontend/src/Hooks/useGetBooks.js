import {useEffect, useState} from 'react';
import axios from 'axios';

export default function useGetBooks(query, pageNumber){
	if(query.length === 0) query="*";
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [books, setBooks] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setBooks([]);
	}, [query]) //every change in query will result to a reset for var books

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: 'GET',
			url: 'http://openlibrary.org/search.json',
			params: {q: query, page: pageNumber},
			cancelToken: new axios.CancelToken(c => cancel = c) //Generation of axio cancel token to prevent continuos requests
		}).then(res => {
			setBooks(prevBooks => {
				//Set use to avoid duplication, combine old books (prevBooks) and new books (res.data)
				return [...new Set([...prevBooks, ...res.data.docs.map(b => b)])]; //Use map to take books title only ... = list
			});
			setHasMore(res.data.docs.length > 0);
			setLoading(false);
		}).catch(e => {
			if(axios.isCancel(e)) return; //Return if the error is axios cancel token
			setError(true);
		})

		return () => cancel();
	}, [query, pageNumber]);

	return {
		loading,
		error,
		books,
		hasMore
	};
}