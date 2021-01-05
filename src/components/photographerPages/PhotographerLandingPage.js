import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';

const PhotographerLandingPage = () => {
	const { currentUser } = useAuth();

	return (
		<Container className="mt-5 d-flex justify-content-around">
			<Link to={`/${currentUser.email}/createAlbum`}>Create Album</Link>
			<Link to={`/${currentUser.email}/listAlbums`}>Your Albums</Link>
		</Container>
	)
}

export default PhotographerLandingPage;