import {useState, useRef, useCallback} from 'react';

//Import controller
import hooksJobs from '../../Hooks/useGetJobs';

//Import css
import './Jobs.css';
import '../global.css';


function Jobs(){
	const [query, setQuery] = useState('');
	const [pageNumber, setPageNumber] = useState(1);

	const {jobs, hasMore, loading, error} = hooksJobs.useGetJobs(query, pageNumber);

	const observe = useRef();
	const lastBookElement = useCallback(node => {
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
					<h1 className="text-white text-center">Books</h1>
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

		

				<div className="row justify-content-evenly">
					{jobs.map((job, index) => { 
				        if (jobs.length === index + 1) {
				          return(
				            <div className="pageLoad card col-5 d-flex flex-row p-0" ref={lastBookElement} key={job.cover_i}>
								<img className="w-25" src="https://www.pngitem.com/pimgs/m/78-788752_team-work-logo-png-transparent-png.png" />
								<div> 
									<h4>{job.title}</h4>
									<h6>Author: {job.author_name}</h6>
									<p>Publish:</p>
								</div>
							</div>
				          )
				        } else {
				          return(
				          	<div className="pageLoad card col-5 d-flex flex-row p-0" key={job.cover_i}>
								<img className="w-25" src="https://www.pngitem.com/pimgs/m/78-788752_team-work-logo-png-transparent-png.png" />
								<div> 
									<h4>{job.title}</h4>
									<h6>Author: {job.author_name}</h6>
									<p>Publish:</p>
								</div>
							</div>
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

			</div>
		</div>

	);
}
export default Jobs;