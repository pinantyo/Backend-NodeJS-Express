import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = 'http://127.0.0.1:5000/api/account';
const URL_SOCKET = 'ws://127.0.0.1:5000';

const useLogin = async (e) => {
	const [error, setError] = useState("");
	const {email, password} = e.target;
	let cancel;
	axios({
		method: 'POST',
	  	url: `${URL}/login`,
	  	cancelToken: new axios.CancelToken(c => cancel = c),
	  	data: {
	    	email,
	    	password
	  	}
	}).then(res => {
		return;
	}).catch(e => {
		setError(e.message);
		if(axios.isCancel(e)) return; //Return if the error is axios cancel token
	});
	return () => cancel();
}

const useGetAccount = (req, res) => {

}



export default {useLogin};