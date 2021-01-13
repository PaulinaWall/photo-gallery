import React, { useState } from 'react';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';
import polaroid1276998_1920 from '../../assets/images/polaroid-1276998_1920.jpg'

const CreateAlbum = () => {
	const [albumTitle, setAlbumTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { currentUser } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		setError(false);
		setLoading(true);

		try{
			await db.collection('albums').add({
				albumTitle,
				owner: currentUser.uid,
				images: [],
				fromCustomer: false,
			});

			navigate(`/${currentUser.email}/listAlbums`);

		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	}
	return (
	<Container>
		<Row className="mt-3">
			<Col sm={12} md={6} lg={6}>
				<Image className="create-image" src={polaroid1276998_1920} fluid />
			</Col>
			{error && (<Alert variant="danger">{error}</Alert>)}
			<Col className="d-flex" sm={12} md={6} lg={6}>
			<Form className="create-form" onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Control 
						type="album-title"
						onChange={(e) => setAlbumTitle(e.target.value)}
						value={albumTitle}
						placeholder="Add album title"
						required
					/>
				</Form.Group>
				<Button disabled={loading} type="submit">Create</Button>
			</Form>
			</Col>
		</Row>
	</Container>
	)
}

export default CreateAlbum;