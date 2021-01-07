import React, {useState} from 'react';
import { Container, Card, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import useGetPhotographerGallery from '../../hooks/useGetPhotographerGallery';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../firebase';

const ListAlbums = () => {
	const [index, setIndex] = useState();
	const { gallery, loading } = useGetPhotographerGallery();
	const { currentUser } = useAuth();
	const [show, setShow] = useState(false);
	const [albumTitle, setAlbumTitle] = useState('');

	const handleClose = () => setShow(false);
	const handleShow = (index) => {setShow(true); setIndex(index);}

	const handleSave = async () => {
		try {
			await db.collection('galleries').doc(gallery.id).get()
			.then((snapshot) => {
				const albums = snapshot.data().albums;
				const album = snapshot.data().albums[index];
				album.albumTitle = albumTitle;
				albums[index] = album;
				db.collection('galleries').doc(gallery.id).set({
					owner: currentUser.uid,
					albums
				})
			})
		} catch (e) {
			console.log(e.message);
		}
		setAlbumTitle('');
		setShow(false);
	}

	return (
		<Container className="mt-3">
			<h1>Your Albums</h1>
			{
				loading
					? (<BarLoader color={"purple"} size={15} />)
					: (
						<Row>
							{
								gallery.albums.map((album, index) => (
									<Col className="mt-3" sm={12} md={4} lg={4} key={index}>
										<Card>
											<Card.Body>
												<Card.Title>
													<Link to={`/${currentUser.email}/${index}`}>
														{album.albumTitle}
													</Link>
												</Card.Title>
											</Card.Body>
											<Button onClick={() => handleShow(index)}>Change Album Title</Button>
										</Card>
									</Col>
								))

							}

						</Row>
					)
			}

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
				<Modal.Title>Change album title </Modal.Title>
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