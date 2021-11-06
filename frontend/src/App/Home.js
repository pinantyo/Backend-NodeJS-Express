import React from 'react';
import './Home.css';

function Home(){
	return(
		<>
			<div className = "par1">
				<div className="title mt-3">
					<h2 className="text-white text-center">Coba App</h2>
				</div>
				<div className="navigation">
					<ul className="navbar-nav d-flex flex-row m-auto w-75 justify-content-between">
						<li><a className="fs-5 nav-link text-white p-3" href="#">Home</a></li>
						<li><a className="fs-5 nav-link text-white p-3" href="#">About Us</a></li>
						<li><a className="fs-5 nav-link text-white p-3" href="#">Our Products</a></li>
						<li><a className="fs-5 nav-link text-white p-3" href="#">Services</a></li>
						<li><a className="fs-5 nav-link text-white p-3" href="#">Account</a></li>
					</ul>
				</div>
			</div>

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

			<div className="container mt-4">
				<div>
					<h1 className="text-white text-center">Feature</h1>
				</div>
				<div className="d-flex flex-row mb-5 mt-5">
					<div className="card me-2">
						<img className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
					</div>

					<div className="card me-2">
						<img className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
					</div>

					<div className="card me-2">
						<img className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
						<div>
							<h2>Event</h2>
						</div>
						
					</div>
				</div>
			</div>

			<div className = "par2"></div>

			<div className="container">
				<div className="d-flex flex-row mb-5 mt-5">
					<div className="col me-5">
						<img className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
					</div>
					
					<div className="col">
						<h2 className="text-white">Title</h2>
						<h5 className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque sed mauris eget posuere. Quisque malesuada nibh ac massa imperdiet, porttitor vulputate justo volutpat. Etiam dolor risus, interdum a massa sed, faucibus finibus sem. Nulla molestie molestie quam, a consequat neque molestie sit amet. Vivamus efficitur faucibus risus quis convallis. Morbi id ex volutpat, pretium nulla at, luctus justo. Proin condimentum finibus lorem et tristique.</h5>
					</div>
				</div>
			</div>

			<div className = "par2"></div>

			<div className="container">
				<div className="d-flex flex-row-reverse mb-5 mt-5">
					<div className="col">
						<img className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
					</div>
					
					<div className="col me-5">
						<h2 className="text-white">Title</h2>
						<h5 className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque sed mauris eget posuere. Quisque malesuada nibh ac massa imperdiet, porttitor vulputate justo volutpat. Etiam dolor risus, interdum a massa sed, faucibus finibus sem. Nulla molestie molestie quam, a consequat neque molestie sit amet. Vivamus efficitur faucibus risus quis convallis. Morbi id ex volutpat, pretium nulla at, luctus justo. Proin condimentum finibus lorem et tristique.</h5>
					</div>
				</div>
			</div>

			<div className = "par1"></div>

			<div className="container">
				<div className="d-flex flex-row-reverse mb-5 mt-5">
					<div className="col">
						<img className="card-img" src="https://franticallyspeaking.com/wp-content/uploads/2021/06/ART-8-PIC.jpg" />	
					</div>
					
					<div className="col me-5">
						<h2 className="text-white">Title</h2>
						<h5 className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque sed mauris eget posuere. Quisque malesuada nibh ac massa imperdiet, porttitor vulputate justo volutpat. Etiam dolor risus, interdum a massa sed, faucibus finibus sem. Nulla molestie molestie quam, a consequat neque molestie sit amet. Vivamus efficitur faucibus risus quis convallis. Morbi id ex volutpat, pretium nulla at, luctus justo. Proin condimentum finibus lorem et tristique.</h5>
					</div>
				</div>
			</div>


			
		</>
	);
}

export default Home;