import {useEffect, useState} from 'react';
import axios from 'axios';


const URL = 'http://127.0.0.1:5000/api' + '/jobs';

// const useGetJobs = (query, pageNumber) => {
// 	if(query.length === 0) query="*";
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(false);
// 	const [jobs, setJobs] = useState([]);
// 	const [hasMore, setHasMore] = useState(false);

// 	useEffect(() => {
// 		setJobs([]);
// 	}, [query]) //every change in query will result to a reset for var jobs

// 	useEffect(() => {
// 		setLoading(true);
// 		setError(false);
// 		let cancel;
// 		axios({
// 			method: 'GET',
// 			url: URL,
// 			params: {q: query, page: pageNumber},
// 			cancelToken: new axios.CancelToken(c => cancel = c) //Generation of axio cancel token to prevent continuos requests
// 		}).then(res => {
// 			setJobs(prevJobs => {
// 				//Set use to avoid duplication, combine old jobs (prevJobs) and new jobs (res.data)
// 				return [...new Set([...prevJobs, ...res.data.docs.map(b => b)])]; //Use map to take jobs title only ... = list
// 			});
// 			setHasMore(res.data.docs.length > 0);
// 			setLoading(false);
// 		}).catch(e => {
// 			if(axios.isCancel(e)) return; //Return if the error is axios cancel token
// 			setError(true);
// 		})

// 		return () => cancel();
// 	}, [query, pageNumber]);

// 	return {
// 		loading,
// 		error,
// 		jobs,
// 		hasMore
// 	};
// };

const useGetJobs = (query, pageNumber) => {
	if(query.length === 0) query="*";
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [jobs, setJobs] = useState([]);
	const [hasMore, setHasMore] = useState(false);

	useEffect(() => {
		setJobs([]);
	}, []) //every change in query will result to a reset for var jobs

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: 'GET',
			url: URL,
			cancelToken: new axios.CancelToken(c => cancel = c) //Generation of axio cancel token to prevent continuos requests
		}).then(res => {
			setJobs(res.data.success.data);
			setLoading(false);
		}).catch(e => {
			if(axios.isCancel(e)) return; //Return if the error is axios cancel token
			setError(true);
		})

		return () => cancel();
	}, [pageNumber]);

	return {
		loading,
		error,
		jobs,
		hasMore
	};
};

export default {useGetJobs};