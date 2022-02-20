import React, { useState } from 'react';
import axios from 'axios';


export default function Form(){
	const [inputs, setInput] = useState("");
	const [error, setError] = useState("");

	const handleInputsChange = (e) =>{
		const name = e.target.name;
		const value = e.target.value
		setInput(values => {{...values, [name]: value}});
	}

	const handleSubmit = async (e) =>{
		e.preventDefault();

		await axios({
			method: 'POST',
			url: URL,
			data:{

			}
		}).then(res => {

		}).catch(err => {
			if(err.response) setError(err.response.data;
		});
		


	}

	return(
		<>
			<form>
				<label htmlFor="jobTitle"/>
				<input type="text" name="jobTitle" value={inputs} onChange={handleInputsChange} />

				<label htmlFor="jobTitle"/>
				<input type="text" name="jobTitle" value={inputs} onChange={handleInputsChange} />

				<label htmlFor="jobTitle"/>
				<input type="text" name="jobTitle" value={inputs} onChange={handleInputsChange} />

				<label htmlFor="jobTitle"/>
				<input type="text" name="jobTitle" value={inputs} onChange={handleInputsChange} />
			</form>
		</>

	);

}