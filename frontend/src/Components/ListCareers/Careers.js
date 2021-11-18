import {useState, useRef} from 'react';

//Import controller
// import getJobs from '../../Controller/getJobs';

//Import css
import './Careers.css';


function List(){
	// const {error, loading, listJobs} = getJobs();
	const loading = true;
	return(
		<>
			<div className="container mt-4">
				<div className="row mb-5">
					<h1 className="text-white text-center">Careers</h1>
				</div>
				
				<div className="row form mt-5 mb-5">
					<form className="d-flex flex-row justify-content-between m-0">
						<input className="form-control" type="text" name="search" />
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
					{loading && 
						<div className="d-flex justify-content-center m-5 loading">
						  <div className="spinner-border text-warning" role="status">
						    <span className="sr-only"></span>
						  </div>
						  <span className="text-white ms-2">Loading...</span>
						</div>
					}

					<div className="card col-5 d-flex flex-row p-0">
						<img className="w-25" src="https://www.pngitem.com/pimgs/m/78-788752_team-work-logo-png-transparent-png.png" />
						<div> 
							<h3>Title</h3>
							<h5>Company</h5>
							<p>Description</p>
						</div>
					</div>

					<div className="card col-5 d-flex flex-row p-0">
						<img className="w-25" src="https://www.pngitem.com/pimgs/m/78-788752_team-work-logo-png-transparent-png.png" />
						<div> 
							<h3>Title</h3>
							<h5>Company</h5>
							<p>Description</p>
						</div>
					</div>

					<div className="card col-5 d-flex flex-row p-0">
						<img className="w-25" src="https://www.pngitem.com/pimgs/m/78-788752_team-work-logo-png-transparent-png.png" />
						<div> 
							<h3>Title</h3>
							<h5>Company</h5>
							<p>Description</p>
						</div>
					</div>



					

				</div>

			</div>
		</>

	);
}
export default List;