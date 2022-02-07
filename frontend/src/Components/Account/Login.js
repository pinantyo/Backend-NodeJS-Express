import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";

// css
import './login.css';

export default function Login(){
	const [currentForm, setCurrent] = useState(0);
	const [currentText, setText] = useState("Don't have account yet?");

	const navigate = useNavigate();
	const handleLogin = async (googleData) => {
	  	// await axios.post("/api/v1/auth/google", {
	   //    	body: JSON.stringify({
	   //    		token: googleData.tokenId
	   //  	}),headers:{
	   //    		"Content-Type": "application/json"
	   //  	}
	  	// })
	  	return;
	}

	const nextSection = () =>{
		if(currentForm === 0){
			setCurrent(1);
			setText("Do you have account?");
		} 
		else{ 
			setCurrent(0);
			setText("Don't have account yet?")
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
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-box-arrow-left w-75" viewBox="0 0 16 16">
							  		<path fillRule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
							  		<path fillRule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
								</svg>  
							</button>
						</div>
						<form method="POST" className={`form-section ${currentForm ? "" : "form-section-active"} d-flex flex-column `}>
							<label htmlFor="email">EMAIL</label>
							<input className="form-control" type="text" name="email"/>
							<label htmlFor="email">PASSWORD</label>
							<input className="form-control" type="password" name="password" autoComplete="on"/>
							
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
							    onSuccess={handleLogin}
							    onFailure={handleLogin}
							    cookiePolicy={'single_host_origin'}
							/>
						</form>

						<form method="POST" className={`form-section ${currentForm ? "form-section-active" : ""} d-flex flex-column `}>
							<label htmlFor="email">EMAIL</label>
							<input className="form-control" type="text" name="email"/>
							<label htmlFor="email">NAME</label>
							<input className="form-control" type="text" name="name"/>
							<label htmlFor="email">PASSWORD</label>
							<input className="form-control" type="password" name="password" autoComplete="on"/>
							
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