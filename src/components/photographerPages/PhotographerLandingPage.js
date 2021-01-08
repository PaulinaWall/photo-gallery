import React from 'react';
import { Container } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import polaroid1276996_1920 from '../../assets/images/polaroid-1276996_1920.jpg';


const PhotographerLandingPage = () => {
	const { currentUser } = useAuth();

	return (
		<>
			<div className="d-flex justify-content-center">
				<Image className="jumbotron-image" src={polaroid1276996_1920} fluid />
			</div>
			<Container className="mt-5 d-flex justify-content-around">
				<Link className="photographer-landingPage-links" to={`/${currentUser.email}/createAlbum`}>Create Album</Link>
				<Link className="photographer-landingPage-links" to={`/${currentUser.email}/listAlbums`}>Your Albums</Link>
			</Container>
		</>
	)
}

export default PhotographerLandingPage;