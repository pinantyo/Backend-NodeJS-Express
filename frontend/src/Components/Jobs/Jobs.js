import {useState, useRef, useCallback} from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, withRouter, useNavigate } from "react-router-dom";

// Import controller
import useJobsHook from '../../Hooks/useJobsHook';

// Import css
import './Jobs.css';
import '../global.css';

// Components Detail
import JobDetail from './Details/JobDetail';
// Components error
import Error from '../Error/Error';


function Jobs(){
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);

	const {jobs, hasMore, loading, error} = useJobsHook.useGetJobs(query, pageNumber);

	const observe = useRef();
	const lastJob = useCallback(node => {
		if(loading) return;
		if(observe.current) observe.current.disconnect();
		observe.current = new IntersectionObserver(entries => {
			if(entries[0].isIntersecting && hasMore){
				setPageNumber(prevPageNumber => prevPageNumber + 1);
			}
		});

		if(node) observe.current.observe(node);
	},[loading, hasMore]);

	function inputQuery(e){
		setQuery(e.target.value);
		setPageNumber(1);
	}

	return(
		<div className="pageLoad">
			<div className="container mt-4">
				<div className="row mb-5">
					<h1 className="text-white text-center">List of Jobs</h1>
				</div>
				
				<div className="row form mt-5 mb-5">
					<form className="d-flex flex-row justify-content-between m-0">
						<input className="form-control" type="text" value={query} onChange={inputQuery}/>
						<button type="submit" className="btn btn-success"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
	  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
	</svg></button>
					</form>

					<ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
					    <li><a className="dropdown-item" href="#">Action</a></li>
					    <li><a className="dropdown-item" href="#">Another action</a></li>
					    <li><a className="dropdown-item" href="#">Something else here</a></li>
					</ul>				
				</div>


				<div className="d-flex flex-row">
					<div className={`d-flex flex-column w-75 scrollcomponent job-list`}>
						{jobs.map((job, index) => { 
					        if (jobs.length === index + 1) {
					          return(
					          	<NavLink to={`${job.slug}/${job._id}`} className="nav-link">
						            <div className="pageLoad card d-flex flex-row p-0 mb-0" ref={lastJob} key={index}>
										<img className={`w-50 p-2 ${jobs.authorId ? "skeleton" : ""}`} src={`http://localhost:5000/public/images/users/avatar/${job.authorId.img.filename.replace(' ','%20')}`} />
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
					          	<NavLink to={`${job.slug}/${job._id}`} className="nav-link">
						            <div className="pageLoad card d-flex flex-row p-0 mb-0" ref={lastJob} key={index}>
										<img className={`w-50 p-2 ${jobs.authorId ? "skeleton" : ""}`} src={`http://localhost:5000/public/images/users/avatar/${job.authorId.img.filename.replace(' ','%20')}`} />
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
							  <span className="text-white ms-2">Loading...</span>
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