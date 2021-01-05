import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';

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
			const docRef = await db.collection('albums').add({
				albumTitle,
				owner: currentUser.uid,
			});

			navigate(`/${currentUser.email}/${docRef.id}`);

		} catch (e) {
			setError(e.message);
			setLoading(false);
		}
	}

	return (
		<Container className="mt-3">
			{error && (<Alert variant="danger">{error}</Alert>)}
			<Form onSubmit={handleSubmit}>
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
		</Container>
	)
}

export default CreateAlbum;