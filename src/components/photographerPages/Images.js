import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Container, Modal, Form, Alert } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { useParams, useNavigate } from 'react-router-dom';

import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import useDeleteImage from '../../hooks/useDeleteImage';
import useSetCheckedImages from '../../hooks/useSetCheckedImages';
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
	const [index, setIndex] = useState(null);
	useDeleteImage(imageToDelete, albumId);
	const { errorChecked } = useSetCheckedImages(index, albumId);

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
		setIndex(index)
	};

	const handleSaveNewAlbum = async () => {
		const checkedImages = filterCheckedImages();
		try{
			await db.collection('albums').add({
				albumTitle,
				fromCustomer: false,
				toCustomer: true,
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

	const handleOnDelete = (index) => {
		setImageToDelete(index);
	};
 
	return (
		<Container>
			<SRLWrapper>
				<Row className="my-3">
					{
						(error || errorChecked) && <Alert variant="danger">{error}</Alert>
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
									album.toCustomer
										? <CustomerUrlPage customerUrl={`${window.location.origin}/review/${albumId}`} />
										: <Button onClick={() => setShow(true)} className="ml-auto">Create new album with marked images</Button>
								}
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
