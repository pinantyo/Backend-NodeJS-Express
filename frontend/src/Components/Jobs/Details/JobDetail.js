import React, {useState, useRef} from 'react';
import { useParams } from 'react-router-dom';
import './JobDetail.css';

// Hooks
import useJobsHook from '../../../Hooks/useJobsHook';

function JobDetail(){
	const [slug, id] = useParams()['*'].split('/');
	const {loading, error, jobs} = useJobsHook.useGetJob(slug, id);
	return(
		<>
			{slug && id &&
				<div className="bg-light w-100 flex-column" data-aos="fade-up">
					<div className="d-flex flex-row p-5 m-0">
						<img className={`w-50 p-2 ${loading ? "skeleton":""}`} src={jobs.authorId ? `http://localhost:5000/public/images/users/avatar/${jobs.authorId.img.filename.replace(' ','%20')}`:""} />
						<div className="pt-5 p-3 d-flex flex-column">
							<h4 className={`${loading ? "skeleton" : ""}`}>{jobs.jobTitle}</h4>
							<h6 className={`${loading ? "skeleton" : ""}`}>{jobs.authorId ? jobs.authorId.username : ""}</h6>
							<h6 className={`${loading ? "skeleton" : ""}`}>Publish: {new Date(jobs.published).toLocaleString()}</h6>
						</div>
					</div>
					<div className="d-flex flex-column p-5">
						<h4>Requirements:</h4>
						<h6 className={`text-occupation ${loading ? "skeleton" : ""}`}>{jobs.jobRequirements}</h6>
					</div>

					<div className="d-flex flex-column p-5">
						<h4>Description:</h4>
						<h6 className={`text-occupation ${loading ? "skeleton" : ""}`}>{jobs.jobDescription}</h6>
					</div>
				</div>
			}
		</>
	);
}

export default JobDetail;
