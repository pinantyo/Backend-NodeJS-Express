import {useEffect, useState} from 'react';
import axios from 'axios';

import {io} from 'socket.io-client';

const URL = 'http://127.0.0.1:5000/api/jobs';
const URL_SOCKET = 'ws://127.0.0.1:5000';

const useGetJobs = () => {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		const socket = io(URL_SOCKET);
	  	socket.on('new-job', (newList) => {
	    	try {
	      		setJobs(newList);
	    	} catch (e) {}
	  	});
	}, [])

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
	}, []);

	return {
		loading,
		error,
		jobs,
	};
};

const useGetJob = (slug, id) => {
	if(id.length === 0 && slug.length === 0) id=slug="*";
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		setJobs([]);
	}, []) //every change in query will result to a reset for var jobs

	useEffect(() => {
		setLoading(true);
		setError(false);
		let cancel;
		axios({
			method: 'GET',
			url: URL+`/${slug}/${id}`,
			cancelToken: new axios.CancelToken(c => cancel = c) //Generation of axio cancel token to prevent continuos requests
		}).then(res => {
			setJobs(res.data.success.data);
			setLoading(false);
		}).catch(e => {
			if(axios.isCancel(e)) return; //Return if the error is axios cancel token
			setError(true);
		})

		return () => cancel();
	}, [id, slug]);

	return {
		loading,
		error,
		jobs,
	};
};

export default {useGetJobs, useGetJob};