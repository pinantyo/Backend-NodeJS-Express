import {useState, useRef} from 'react';
import './JobDetail.css';


function JobDetail({job}){
	return(
		<>
			<div className="bg-light w-100">
				<h1>{job}</h1>
				<h4 className="text-center text-occupation">Job 1</h4>

			</div>
		</>
	);
}

export default JobDetail;
