import React from 'react';
//Import css
import './Aboutus.css';
import '../global.css';


export default function Aboutus(){
	return(
		<div className="pageLoad">
			<div className="container mt-4">
				<div>
					<h1 className="text-dark text-center">About Us</h1>
				</div>
				<div className="d-flex flex-row mb-5 mt-5">
					<div className="card me-2">
						<img alt="sky" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
					</div>

					<div className="card me-2">
						<img alt="sky" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
					</div>

					<div className="card me-2">
						<img alt="sky" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
						
					</div>
				</div>
			</div>
		</div>
	);
}