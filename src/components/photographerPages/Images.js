import React, { useState, useContext } from 'react';
import { Row, Col, Card, Button, Container, Modal, Form } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { uid } from 'uid';

import { useCustomerFunctions } from '../../contexts/CustomerContext';
import { useAuth } from '../../contexts/AuthContext';
// import { DataContext } from '../../contexts/DataContext';

const Images = ({ images }) => {
	const { albumId } = useParams();
	// const { checked, createCustomerAlbum } = useCustomerFunctions();
	// const { checkImages } = useContext(DataContext);
	const { currentUser } = useAuth();
	const [customerUrl, setCustomerUrl] = useState(false);
	const [showCustomerUrl, setShowCustomerUrl] = useState(false);
	const [albumTitle, setAlbumTitle] = useState('');
	const [show, setShow] = useState(false);
	// const [newImages, setNewImages] = useState([]);

	const filterCheckedImages = () => {
		// const checkedImages = images.filter((image) => image.checked === true);
		// return checkedImages;
	};

	const handleCheckOnClick = (index) => {
		// checked(albumId, index, currentUser);
		// setNewImages(checkImages(index, images))
	};

	const handleCreateCustomerGallery = () => {
		// const randomId = uid(10);
		// setCustomerUrl(`http://localhost:3000/customer/${randomId}`);
		// setShowCustomerUrl(true);
		// const checkedImages = filterCheckedImages();
		// createCustomerAlbum(checkedImages, randomId);
	};

	const handleCreateNewAlbumOnClick = () => {
		setShow(true);
	};

	const handleSaveNewAlbum = () => {
		// const checkedImages = filterCheckedImages();
		// createCustomerAlbum(checkedImages, albumTitle);
	};

	return (
		<Container>
			<SRLWrapper>
				<Row className="my-3">
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
				<Button className="ml-auto mb-2" onClick={handleCreateCustomerGallery}>Create gallery for customer</Button>
				

				<Button onClick={handleCreateNewAlbumOnClick} className="ml-auto">Create new album with marked images</Button>
			</div>
			<Modal
				animation={false}
				size="sm"
				show={showCustomerUrl}
				aria-labelledby="example-modal-sizes-title-sm"
				onHide={() => setShowCustomerUrl(false)}
			>
				<Modal.Header closeButton>
				<Modal.Title id="example-modal-sizes-title-sm">
					{customerUrl}
				</Modal.Title>
				</Modal.Header>
			</Modal>

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
