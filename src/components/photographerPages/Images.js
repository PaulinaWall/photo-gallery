import React, { useState } from 'react';
import { Row, Col, Card, Button, Container, Modal, Form, Alert } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const Images = ({ images }) => {
	const { albumId } = useParams();
	const { currentUser } = useAuth();
	const [customerUrl, setCustomerUrl] = useState(false);
	const [showCustomerUrl, setShowCustomerUrl] = useState(false);
	const [albumTitle, setAlbumTitle] = useState('');
	const [show, setShow] = useState(false);
	const [error, setError] = useState();

	const filterCheckedImages = () => {
		const checkedImages = images.filter((image) => image.checked === true);
		return checkedImages;
	};

	const handleCheckOnClick = async (index) => {
		try{
			await db.collection('images').doc(images[index].id).set({
				...images[index],
				checked: !images[index].checked,
			});
		} catch(e) {
			setError(e.message);
		}
	};

	const createNewAlbum = async (images) => {
		try{
			await db.collection('albums').add({
				albumTitle: albumId,
				owner: currentUser.uid,
			});
		} catch (e) {
			setError(e.message);
		}
	}

	const handleCreateCustomerGallery = () => {
		setCustomerUrl(`http://localhost:3000/review/${albumId}`);
		setShowCustomerUrl(true);
		const checkedImages = filterCheckedImages();
		createNewAlbum(checkedImages);
	};

	const handleCreateNewAlbumOnClick = () => {
		setShow(true);
	};

	const handleSaveNewAlbum = () => {
		const checkedImages = filterCheckedImages();
		createNewAlbum(checkedImages);
	};

	return (
		<Container>
			<SRLWrapper>
				<Row className="my-3">
					{
						error && <Alert variant="danger">{error}</Alert>
					}
					{
						images.map((image, index) => {
						return	<Col sm={6} md={4} lg={3} key={index}>
								<Card className="mb-3">
									<Card.Header>
										<FontAwesomeIcon
											className={image.checked ? 'checkedIcon' : 'unCheckedIcon'} 
											icon={faCheck} 
											onClick={() => handleCheckOnClick(index)}
										/>
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
					showCustomerUrl 
					? <p className="ml-auto mb-2">{customerUrl}</p>
					: <Button className="ml-auto mb-2" onClick={handleCreateCustomerGallery}>Create gallery for customer</Button>
				}
				<Button onClick={handleCreateNewAlbumOnClick} className="ml-auto">Create new album with marked images</Button>
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
