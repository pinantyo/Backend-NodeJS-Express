import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";

// css
import './login.css';

// custom hooks
import {useLogin} from '../../Hooks/useAccountHook';

export default function Login(){
	const URL = 'http://127.0.0.1:5000/api/account';
	const [currentForm, setCurrent] = useState(0);
	const [currentText, setText] = useState("Don't have account yet?");
	const [data, setDatas] = useState({});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleAccountLoginChange = (e) =>{
	    const name = e.target.name;
	    const value = e.target.value;
	    setDatas(values => ({...values, [name]: value}));
	}

	const handleAccountSignUpChange = (e) =>{
	    const name = e.target.name;
	    const value = e.target.value;
	    setDatas(values => ({...values, [name]: value}));
	}

	const handleAccountLogin = async (e) => {
		e.preventDefault();
		setError("");
		let cancel;
		await axios({
			method: 'POST',
		  	url: `${URL}/login`,
		  	cancelToken: new axios.CancelToken(c => cancel = c),
		  	data: {
		    	email:data.email,
		    	password:data.password
		  	}
		}).then(res => {
			localStorage.setItem('user', res.data.user ? res.data.user : '');
			res.setHeader("X-Access-Token", res.data.accessToken);
			return;
		}).catch(err => {
			if(err.response){
				setError(err.response.data);
			}
			if(axios.isCancel(e)) return; //Return if the error is axios cancel token
		});
		return () => cancel();
	}

	const handleGoogleLogin = async (googleData) => {
	  	// await axios.post("/api/v1/auth/google", {
	   //    	body: JSON.stringify({
	   //    		token: googleData.tokenId
	   //  	}),headers:{
	   //    		"Content-Type": "application/json"
	   //  	}
	  	// })
	  	return;
	}

	const handleAccountSignUp = (e) =>{
		e.preventDefault();
		// navigate(-1);
		console.log(data)
		return;
	}	

	const nextSection = () =>{
		if(currentForm === 0){
			setCurrent(1);
			setText("Do you have account?");
		} 
		else{ 
			setCurrent(0);
			setText("Don't have account yet?");
		}
		return;
	}

	const switchForm = () =>{
		nextSection();
		return;
	}

	return(
		<>
			<div className="container mt-4" data-aos="fade-up" data-aos-offset="200">
				<div className="d-flex flex-row card">			      
					<div className="form p-5 w-100">
						<div className="d-flex flex-row justify-content-between">
							<button onClick={() => navigate(-1)} className="back">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-box-arrow-left w-50" viewBox="0 0 16 16">
							  		<path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
							  		<path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
								</svg>  
							</button>
						</div>

						{error && 
							<div className="d-flex flex-row text-danger danger-div" data-aos="fade-up">
				                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-exclamation-triangle danger-logo" viewBox="0 0 16 16">
				  					<path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"></path>
				  					<path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"></path>
								</svg>
								{error.message}
							</div>
						}

						<form method="POST" onSubmit={handleAccountLogin} className={`form-section ${currentForm ? "" : "form-section-active"} d-flex flex-column `}>
							<label htmlFor="email">EMAIL</label>
							<input className="form-control" type="text" value={data.email || ""} onChange={handleAccountLoginChange} name="email"/>
							<label htmlFor="email">PASSWORD</label>
							<input className="form-control" type="password" value={data.password || ""} onChange={handleAccountLoginChange} name="password" autoComplete="on"/>
							
							<div className="optionLogin">
								<button type="submit" className="btn-login-account">
									<div>
										<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
										  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
										  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
										</svg>
									</div>
									<span>Log in with Account</span>
								</button>

								<GoogleLogin
								    buttonText="Log in with Google"
								    onSuccess={handleGoogleLogin}
								    onFailure={handleGoogleLogin}
								    cookiePolicy={'single_host_origin'}
								/>
							</div>
								
						</form>

						<form method="POST" onSubmit={handleAccountSignUp} className={`form-section ${currentForm ? "form-section-active" : ""} d-flex flex-column `}>
							<label htmlFor="email">EMAIL</label>
							<input className="form-control" type="text" name="email" value={data.email || ""} onChange={handleAccountSignUpChange}/>
							<label htmlFor="email">NAME</label>
							<input className="form-control" type="text" name="name" value={data.name || ""} onChange={handleAccountSignUpChange}/>
							<label htmlFor="email">PASSWORD</label>
							<input className="form-control" type="password" value={data.password || ""} onChange={handleAccountSignUpChange} name="password" autoComplete="on"/>
							
							<button type="submit" className="btn-login-account">
								<div>
									<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
									  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
									  <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
									</svg>
								</div>
								<span>Sign up with Account</span>
							</button>
						</form>	
						<button onClick={switchForm} className="anchor">{currentText}</button>
					</div>

					<div id="imgdiv" className="w-100" />
				</div>
			</div>
		</>
	);

}