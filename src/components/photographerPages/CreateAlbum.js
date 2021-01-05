import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const CreateAlbum = () => {
	const [albumTitle, setAlbumTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('submitted');
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