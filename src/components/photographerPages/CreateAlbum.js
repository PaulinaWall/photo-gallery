import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase';

import { useAuth } from '../../contexts/AuthContext';
import useGetPhotographerGallery from '../../hooks/useGetPhotographerGallery';

const CreateAlbum = () => {
	const [albumTitle, setAlbumTitle] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const { currentUser } = useAuth();
	const { gallery } = useGetPhotographerGallery();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		setError(false);
		setLoading(true);

		try{
			if(gallery.owner === currentUser.uid){
				await db.collection('galleries')
				.doc(gallery.id)
				.get()
				.then((snapshot) => {
					const albums = snapshot.data().albums;
					albums.push({albumTitle, images: []})

					db.collection('galleries').doc(gallery.id).set({
						albums,
					}, {merge: true})
					.then(() => {
						console.log('Updated albums with success');
						navigate(`/${currentUser.email}/listAlbums`);
					})
					.catch((e) => {
						setError(e.message);
					})
				})
			}else {
				await db.collection('galleries').add({
					owner: currentUser.uid,
					albums: [{
						albumTitle,
						images: [],
					}]
				});

				navigate(`/${currentUser.email}/listAlbums`);
			}

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