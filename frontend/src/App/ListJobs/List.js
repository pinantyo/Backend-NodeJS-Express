import {useState, useRef} from 'react';
import getJobs from '../../Controller/getJobs';
function List(){
	// const {error, loading, listJobs} = getJobs();
	return(
		<>
			<div className="container mt-4 form">
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
		</>

	);
}
export default List;