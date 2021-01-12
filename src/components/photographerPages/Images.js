import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container, Modal, Form, Alert } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import useDeleteImage from '../../hooks/useDeleteImage';

const Images = ({ images, album }) => {
	const navigate = useNavigate()
	const { albumId } = useParams();
	const { currentUser } = useAuth();
	const [customerUrl, setCustomerUrl] = useState('');
	const [albumTitle, setAlbumTitle] = useState('');
	const [show, setShow] = useState(false);
	const [showModal, setShowModal] = useState(false);
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

	const handleCheckOnClick = (index) => {
		try{
			db.collection('albums').doc(albumId).get().then((doc) => {
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

	const handleSaveNewAlbum = () => {
		const checkedImages = filterCheckedImages();
		try{
			db.collection('albums').add({
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
	
	const handleCreateCustomerOnClick = () => {
		const checkedImages = filterCheckedImages();
		try{
			db.collection('albums').doc(albumId).set({
				albumTitle,
				fromCustomer: false,
				owner: currentUser.uid,
				images: checkedImages,
			})
			.then(() => {
				setCustomerUrl(`${window.location.origin}/review/${albumId}`);
				setShowModal(true);
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
					images && images.map((image, index) => {
						
						return	<Col sm={6} md={4} lg={3} key={index}>
								<Card className="mb-3">
									
									<Card.Header>
									{
										!album.fromCustomer &&
											<div className="d-flex justify-content-between">
												<FontAwesomeIcon
													className={image.checked ? 'checkedIcon' : 'unCheckedIcon'} 
													icon={faCheck} 
													onClick={() => handleCheckOnClick(index)}
												/>
												<FontAwesomeIcon
													className="delete-icon"
													icon={faTimes} 
													onClick={() => handleOnDelete(index)}
												/>
											</div>
									}
										
									</Card.Header>
									<a href={image.url} title="View image in lightbox" data-attribute="SRL">
										<Card.Img variant="top" src={image.url} title={image.name} />
									</a>
									<Card.Body>
										<Card.Text className="text-muted small">
											{image.name} ({Math.round(image.size/1024)} kb)
										</Card.Text>
									</Card.Body>
								</Card>
							</Col>
						})}
				</Row>
			</SRLWrapper>
			<div className="mb-3 d-flex flex-column">
				{
					!album.fromCustomer
						? 
							<>
								<Button className="ml-auto mb-2" onClick={handleCreateCustomerOnClick}>Create gallery for customer</Button>

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

			<Modal
				animation={false}
				size="sm"
				show={showModal}
				aria-labelledby="example-modal-sizes-title-sm"
				onHide={() => setShowModal(false)}
			>
				<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-sm">
					Wow good choice, here is the URL!
				</Modal.Title>
				</Modal.Header>
				<Modal.Body><Link to={customerUrl}>{customerUrl}</Link></Modal.Body>
			</Modal>
		</Container>
	)
}

export default Images
