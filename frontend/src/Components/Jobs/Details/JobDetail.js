import {useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import './JobDetail.css';

// Hooks
import useJobsHook from '../../../Hooks/useJobsHook';

function JobDetail(){
	const [slug, id] = useParams()['*'].split('/');
	const {loading, error, jobs} = useJobsHook.useGetJob(slug, id);
	console.log(jobs);
	return(
		<>
			<div className="bg-light w-100 flex-column">
				{loading && 
					<div className="d-flex justify-content-center m-0 loading">
					  <div className="spinner-border text-warning" role="status">
					    <span className="sr-only"></span>
					  </div>
					  <span className="text-white ms-2">Loading...</span>
					</div>
				}
				<div className="d-flex flex-row p-5 m-0">
					{jobs.authorId && 
						<img className={`w-50 p-2`} src={`http://localhost:5000/public/images/users/avatar/${jobs.authorId.img.filename.replace(' ','%20')}`} />
					}
					<div className="pt-5 p-3 d-flex flex-column">
						<h4>{jobs.jobTitle}</h4>
						{jobs.authorId && <h6>{jobs.authorId.username}</h6>}
						<h6>Publish: {new Date(jobs.published).toLocaleString()}</h6>
					</div>
				</div>
				<div className="d-flex flex-column p-5">
					<h4>Requirements:</h4>
					<h6 className="text-occupation">{jobs.jobRequirements}</h6>
				</div>
				

			</div>
		</>
	);
}

export default JobDetail;
