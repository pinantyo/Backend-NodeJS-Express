import React, {useState} from 'react';
import { Routes, Route, NavLink } from "react-router-dom";
import axios from "axios";
// Import controller
import useJobsHook from '../../Hooks/useJobsHook';

// Import css
import './Jobs.css';
import '../global.css';

// Components Detail
import JobDetail from './Details/JobDetail';
// Components error


function Jobs(){
	const URL = "http://127.0.0.1:5000/api/jobs/search";
	const [query, setQuery] = useState('');
	const [search, setSearch] = useState('');
	const {jobs, loading} = useJobsHook.useGetJobs();

	const inputQuery = async (e) => {
		setQuery(e.target.value);

		let cancel;

		await axios({
			method:'GET',
			url:URL,
			params: {
				search: query
		    },
			cancelToken: new axios.CancelToken(c => cancel = c)
		}).then(res => {
			setSearch(res.data.success.data);
			console.log(res.data.success.data);
		}).catch(err => {
			console.log(err.message);
		})
	}

	return(
		<div data-aos="fade-up">
			<div className="container mt-4 pb-5">
				<div className="row mb-5">
					<h1 className="text-dark text-center">List of Jobs</h1>
				</div>
				
				<div className="row form mt-5 mb-5 dropdown">
					<form className="d-flex flex-row justify-content-between m-0 p-0">
						<input className="form-control dropdown-toggle" type="text" value={query} onChange={inputQuery}/>
						<button type="submit" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
	  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
	</svg></button>
					</form>

					<ul className={`dropdown-menu  ${query ? "drop-down-active" : ""}`} aria-labelledby="dropdownMenuLink">
						{search && 
							search.map((job) => {
								return(
									<a className="d-flex flex-row p-3" key={job._id}>
								    	<img className="w-25" src={`http://localhost:5000/public/images/users/avatar/${job.authorId.img.filename.replace(' ','%20')}`} alt="company logo"/>
								    	<div className="d-flex flex-column">
								    		<h4 className="dropdown-item">{job.jobTitle}</h4>
								    		<h5 className="dropdown-item">{job.authorId.username}</h5>
								    	</div>
								    </a>	
								)
							})
						}
					</ul>				
				</div>

				<div className="d-flex flex-row">
					<div className={`d-flex flex-column w-75 scrollcomponent job-list`}>
						{jobs.map((job, index) => { 
					        if (jobs.length === index + 1) {
					          return(
					          	<NavLink to={`${job.slug}/${job._id}`} className="nav-link" key={job._id}>
						            <div className="pageLoad card d-flex flex-row p-0 mb-0">
										<img alt="company logo" className={`w-50 p-2 ${jobs.authorId ? "skeleton" : ""}`} src={`http://localhost:5000/public/images/users/avatar/${job.authorId.img.filename.replace(' ','%20')}`} />
										<div className="m-auto p-2"> 
											<h4 className="text-dark">{job.jobTitle}</h4>
											<h6 className="text-dark">{job.authorId.username}</h6>
											<p className="text-dark">Published: {new Date(job.published).toLocaleString()}</p>
										</div>
									</div>
								</NavLink>
					          )
					        } else {
					          return(
					          	<NavLink to={`${job.slug}/${job._id}`} className="nav-link" key={job._id}>
						            <div className="pageLoad card d-flex flex-row p-0 mb-0">
										<img alt="company logo" className={`w-50 p-2 ${jobs.authorId ? "skeleton" : ""}`} src={`http://localhost:5000/public/images/users/avatar/${job.authorId.img.filename.replace(' ','%20')}`} />
										<div className="m-auto p-2"> 
											<h4 className="text-dark">{job.jobTitle}</h4>
											<h6 className="text-dark">{job.authorId.username}</h6>
											<p className="text-dark">Published: {new Date(job.published).toLocaleString()}</p>
										</div>
									</div>
								</NavLink>
					          )
					        }    
					    })}

					    {loading && 
							<div className="d-flex justify-content-center m-5 loading">
							  <div className="spinner-border text-warning" role="status">
							    <span className="sr-only"></span>
							  </div>
							  <span className="text-dark ms-2">Loading...</span>
							</div>
						}
					</div>

					<div className="bg-light w-100">
						<Routes>
							{jobs.map((job, index) => {
								return(
									<Route path={`:${job.slug}/:${job._id}`} element={<JobDetail/>} key={job._id}/>
								);
							})}
        				</Routes>
					</div>

				</div>

		

					

			</div>
		</div>

	);
}
export default Jobs;