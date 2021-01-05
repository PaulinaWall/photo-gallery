import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Container } from 'react-bootstrap';

const LandingPage = () => {

	const navigate = useNavigate();

	const handleOnClick = () => {
		navigate('/signup')
	};

	return ( 
		<Container className="landingPage d-flex flex-column align-items-center">
			<h1 className="mt-5">Photo-gallery</h1>
			<p className="mt-5">Are you a photographer signin and make a gallery</p>
			<Button className="button mt-5" onClick={handleOnClick}>
				Create account
			</Button>
		</Container>
	 );
}
 
export default LandingPage;