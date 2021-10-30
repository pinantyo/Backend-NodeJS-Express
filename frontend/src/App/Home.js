import React from 'react';
import './Home.css';

function Home(){
	return(
		<>
			<div className = "par1"></div>

			<div className="container">
				<div className="d-flex flex-column">
					<div className="flex-row">
						<h1>Section 1</h1>
					</div>

					<div>
						<h1>Section 2</h1>
					</div>
				</div>
			</div>

			<div className = "par2"></div>

			<div className="container">
				<div className="d-flex flex-column">
					<div className="flex-row">
						<h1>Section 1</h1>
					</div>

					<div>
						<h1>Section 2</h1>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="d-flex flex-column">
					<div className="flex-row">
						<h1>Section 1</h1>
					</div>

					<div>
						<h1>Section 2</h1>
					</div>
				</div>
			</div>

			<div className="ocean">
			  <div className="wave"></div>
			  <div className="wave"></div>
			</div>
		</>
	);
}

export default Home;