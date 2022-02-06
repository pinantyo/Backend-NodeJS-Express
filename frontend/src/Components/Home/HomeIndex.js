import React from 'react';

//Import css
import './HomeIndex.css';
import '../global.css';

function HomeIndex(){
	return(
		<>
			<div className="container mt-4" data-aos="fade-up" data-aos-offset="200">
				<div>
					<h1 className="text-white text-center">Feature</h1>
				</div>
				<div className="d-flex flex-row mb-5 mt-5">
					<div className="card me-2">
						<img alt="img" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
					</div>

					<div className="card me-2">
						<img alt="img" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
					</div>

					<div className="card me-2">
						<img alt="img" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
						
					</div>
				</div>
			</div>

			<div className = "par2"></div>

			<div className="container">
				<div className="d-flex flex-row mb-5 mt-5">
					<div className="col me-5" data-aos="fade-right" data-aos-offset="100">
						<img alt="img" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
					</div>
					
					<div className="col" data-aos="fade-left" data-aos-offset="100">
						<h2 className="text-white">Title</h2>
						<h5 className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque sed mauris eget posuere. Quisque malesuada nibh ac massa imperdiet, porttitor vulputate justo volutpat. Etiam dolor risus, interdum a massa sed, faucibus finibus sem. Nulla molestie molestie quam, a consequat neque molestie sit amet. Vivamus efficitur faucibus risus quis convallis. Morbi id ex volutpat, pretium nulla at, luctus justo. Proin condimentum finibus lorem et tristique.</h5>
					</div>
				</div>
			</div>

			<div className = "par2"></div>

			<div className="container">
				<div className="d-flex flex-row-reverse mb-5 mt-5">
					<div className="col" data-aos="fade-right" data-aos-offset="100">
						<img alt="img" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
					</div>
					
					<div className="col me-5" data-aos="fade-left" data-aos-offset="100">
						<h2 className="text-white">Title</h2>
						<h5 className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque sed mauris eget posuere. Quisque malesuada nibh ac massa imperdiet, porttitor vulputate justo volutpat. Etiam dolor risus, interdum a massa sed, faucibus finibus sem. Nulla molestie molestie quam, a consequat neque molestie sit amet. Vivamus efficitur faucibus risus quis convallis. Morbi id ex volutpat, pretium nulla at, luctus justo. Proin condimentum finibus lorem et tristique.</h5>
					</div>
				</div>
			</div>

			<div className = "par1"></div>

			<div className="container">
				<div className="d-flex flex-row-reverse mb-5 mt-5">
					<div className="col" data-aos="fade-right" data-aos-offset="100">
						<img alt="img" className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
					</div>
					
					<div className="col me-5" data-aos="fade-left" data-aos-offset="100">
						<h2 className="text-white">Title</h2>
						<h5 className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque sed mauris eget posuere. Quisque malesuada nibh ac massa imperdiet, porttitor vulputate justo volutpat. Etiam dolor risus, interdum a massa sed, faucibus finibus sem. Nulla molestie molestie quam, a consequat neque molestie sit amet. Vivamus efficitur faucibus risus quis convallis. Morbi id ex volutpat, pretium nulla at, luctus justo. Proin condimentum finibus lorem et tristique.</h5>
					</div>
				</div>
			</div>


			
		</>
	);
}

export default HomeIndex;