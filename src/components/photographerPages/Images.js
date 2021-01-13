import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container, Modal, Form, Alert } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { useParams, useNavigate } from 'react-router-dom';

import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import useDeleteImage from '../../hooks/useDeleteImage';
import CustomerUrlPage from './CustomerUrlPage';
import ImageCard from './ImageCard';

const Images = ({ images, album }) => {
	const navigate = useNavigate()
	const { albumId } = useParams();
	const { currentUser } = useAuth();
	const [albumTitle, setAlbumTitle] = useState('');
	const [show, setShow] = useState(false);
	const [error, setError] = useState();
	const [imageToDelete, setImageToDelete] = useState(null);
	useDeleteImage(imageToDelete, albumId);

	useEffect(() => {
		setAlbumTitle(album.albumTitle)
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const filterCheckedImages = () => {
		const checkedImages = images.filter((image) => image.checked === true);
		checkedImages.forEach((image) => {
			image.checked = false;
		})
		return checkedImages;
	};

	const handleCheckOnClick = async (index) => {
		try{
			await db.collection('albums').doc(albumId).get().then((doc) => {
				const images = doc.data().images;
				const image = doc.data().images[index];
				image.checked = !image.checked;
				images[index] = image;
				db.collection('albums').doc(albumId).set({
					...doc.data(),
					images,
				});
			});
		} catch(e) {
			setError(e.message);
		}
	};

	const handleSaveNewAlbum = async () => {
		const checkedImages = filterCheckedImages();
		try{
			await db.collection('albums').add({
				albumTitle,
				fromCustomer: false,
				owner: currentUser.uid,
				images: checkedImages,
			})
			.then((docRef) => {
				navigate(`/${currentUser.email}/${docRef.id}`);
				setShow(false);
			})
		} catch (e) {
			setError(e.message);
		}
	};
	
	const handleCreateCustomerOnClick = async () => {
		const checkedImages = filterCheckedImages();
		try{
			await db.collection('albums').doc(albumId).set({
				customerUrl: `${window.location.origin}/review/${albumId}`,
				albumTitle,
				fromCustomer: false,
				owner: currentUser.uid,
				images: checkedImages,
			})
		} catch (e) {
			setError(e.message);
		}
	};

	const handleOnDelete = (index) => {
		setImageToDelete(index);
	};
 
	return (
		<Container>
			<SRLWrapper>
				<Row className="my-3">
					{
						error && <Alert variant="danger">{error}</Alert>
					}
					{
						images && images.map((image, index) => (
							<Col sm={6} md={4} lg={3} key={index}>
								<ImageCard
									album={album}
									image={image}
									handleOnDelete={() => handleOnDelete(index)}
									handleCheckOnClick={() => handleCheckOnClick(index)}
								/>
							</Col>
						))
					}
				</Row>
			</SRLWrapper>

			

			<div className="mb-3 d-flex flex-column">
				{
					!album.fromCustomer
						? 
							<>
								{
									album.customerUrl
										? <CustomerUrlPage customerUrl={album.customerUrl} />
										: <Button className="ml-auto mb-2" onClick={handleCreateCustomerOnClick}>Create gallery for customer</Button>
								}

								<Button onClick={() => setShow(true)} className="ml-auto">Create new album with marked images</Button>
							</>
						: ''
				}
				
			</div>

			<Modal show={show} animation={false} onHide={() => setShow(false)}>
				<Modal.Header closeButton>
				<Modal.Title>Add album title</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control
							type="album-title"
							onChange={(e) => setAlbumTitle(e.target.value)}
							value={albumTitle}
							placeholder="Album Title"
							required
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={() => setShow(false)}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSaveNewAlbum()}>
					Create updated Album
				</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	)
}

export default Images
