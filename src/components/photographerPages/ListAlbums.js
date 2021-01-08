import React, {useState} from 'react';
import { Container, Card, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import polaroid1276996_1920 from '../../assets/images/polaroid-1276996_1920.jpg'
import useGetAlbums from '../../hooks/useGetAlbums'
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

const ListAlbums = () => {
	const [index, setIndex] = useState();
	const { currentUser } = useAuth();
	const [show, setShow] = useState(false);
	const [albumTitle, setAlbumTitle] = useState('');
	const { albums, loading } = useGetAlbums();
	const [error, setError] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = (index, title) => {
		setShow(true); 
		setIndex(index); 
		setAlbumTitle(title);
	}

	const handleSave = async () => {
		try {
			await db.collection('albums').doc(albums[index].id).set({
				albumTitle,
				owner: currentUser.uid,
			})
		} catch (e) {
			setError(e.message);
		}
		setAlbumTitle('');
		setShow(false);
	}

	return (
		<Container className="mt-3 mb-4">
			{
				error && <Alert variant="danger">{error}</Alert>
			}
			<div className="d-flex justify-content-center">
				<Image className="jumbotron-image" src={polaroid1276996_1920} fluid />
			</div>
			{
				loading
					? (<BarLoader color={"purple"} size={15} />)
					: (
						<Row>
							{
								albums.map((album, index) => (
									(album.owner === currentUser.uid) && (
										<Col className="mt-3" sm={12} md={4} lg={4} key={index}>
											<Card className="album-card">
												<Card.Body className="pb-0">
													<Card.Title className="card-title">
														<div className="card-title album-links">
															<Link className="mb-3 albumList-links" to={`/${currentUser.email}/${album.id}`}>
																{album.albumTitle}
															</Link>
														</div>
													</Card.Title>
												</Card.Body>
												<Button className="m-3" onClick={() => handleShow(index, album.albumTitle)}>Change Album Title</Button>
											</Card>
										</Col>
									)
								))
							}
						</Row>
					)
			}

			<Modal show={show} onHide={handleClose} animation={false}>
				<Modal.Header closeButton>
				<Modal.Title>Change album title </Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control
							type="album-title"
							onChange={(e) => setAlbumTitle(e.target.value)}
							value={albumTitle}
							placeholder={albumTitle}
							required
						/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={() => handleSave()}>
					Save Changes
				</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	)
}

export default ListAlbums;