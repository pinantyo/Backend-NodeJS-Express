import {useEffect, useState} from 'react';
import axios from 'axios';

export default function getJobs(list, pageNumber){
	const [loading, setLoading] = useState(false);
	const [listJobs, setListJobs] = useState([]);
	const [error, setError] = useState(false);
	const [hasData, setHasData] = useState(false);

	useEffect(()=>{
		setListJobs([]);
	},[listJobs]);

	useEffect(() => {

		setLoading(true);
		setError(false);
		let cancel;

		axios({
			method: 'GET',
			url: '',
			params: {},
			cancelToken: new axios.CancelToken(c => cancel = c)
		}).then(res => {
			setListJobs(res.data);
			console.log(res.data);
			setLoading(false);
		}).catch(e => {
			if(axios.isCancel(e)) return;
			setError(true);
		})
	},[list, pageNumber]);

	return {
		loading,
		listJobs,
		error
	};
}