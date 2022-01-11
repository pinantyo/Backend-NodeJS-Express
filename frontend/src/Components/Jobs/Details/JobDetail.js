import {useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import './JobDetail.css';

// Hooks
import useJobsHook from '../../../Hooks/useJobsHook';

function JobDetail(){
	const id = useParams()['*'].split('/')[1];
	const {loading, error, jobs} = useJobsHook.useGetJob(id)

	console.log(jobs);

	return(
		<>
			<div className="bg-light w-100">
				<h1></h1>
				<h4 className="text-center text-occupation">Job 1</h4>

			</div>
		</>
	);
}

export default JobDetail;
