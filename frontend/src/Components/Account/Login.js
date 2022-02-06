import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import axios from "axios";

// css
import './login.css';

export default function Login(){
	const navigate = useNavigate();
	const handleLogin = async (googleData) => {
	  	const res = await axios.post("/api/v1/auth/google", {
	      	body: JSON.stringify({
	      		token: googleData.tokenId
	    	}),headers:{
	      		"Content-Type": "application/json"
	    	}
	  	})
	}
	return(
		<>
			<div className="container">
				<div className="d-flex flex-row card">			      
					<div className="form" >
						<form method="POST">
							<div className="d-flex flex-column">
								<div className="d-flex flex-row justify-content-between">
									<button onClick={() => navigate('/')} className="back">
										<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-box-arrow-left" viewBox="0 0 16 16">
									  		<path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
									  		<path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
										</svg>  
									</button>
									<p>SIGN IN</p>
								</div>
									
								<label for="email">EMAIL</label>
								<input className="form-control" type="text" name="email"/>
								<label for="email">PASSWORD</label>
								<input className="form-control" type="password" name="password"/>
								<input className="submit" type="submit" name="submit" value="Login"/>
								
								<GoogleLogin
								    buttonText="Log in with Google"
								    onSuccess={handleLogin}
								    onFailure={handleLogin}
								    cookiePolicy={'single_host_origin'}
								/>
							</div>

							<div className="form-section d-flex flex-column">
								<p className="title">SIGN UP</p>
								<label for="email">EMAIL</label>
								<input className="form-control" type="text" name="email"/>
								<label for="email">NAME</label>
								<input className="form-control" type="text" name="name"/>
								<label for="email">PASSWORD</label>
								<input className="form-control" type="password" name="password"/>
								<input className="submit" type="submit" name="submit" value="Create Account"/>
							</div>
						</form>
						<button id="navigateSign" className="anchor" onclick="signFunction(event)">Don't have account yet?</button>
					</div>

					<div id="imgdiv" className="col2 skeleton" />

					
				</div>
			</div>
		</>
	);

}