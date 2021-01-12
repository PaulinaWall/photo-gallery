import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import polaroid1276996_1920 from '../assets/images/polaroid-1276996_1920.jpg'
import Image from 'react-bootstrap/Image'

const LandingPage = () => {
	return ( 
		<>
			<div className="d-flex justify-content-center">
				<Image className="jumbotron-image" src={polaroid1276996_1920} fluid />
			</div>
			<Container className="landingPage d-flex flex-column align-items-center">
				<h1 className="mt-5">Photo-gallery</h1>
				<p className="mt-5">Are you a photographer sign in and make a gallery or, register <Link to="/signup">here</Link>!</p>
			</Container>
		</>
	 );
}
 
export default LandingPage;