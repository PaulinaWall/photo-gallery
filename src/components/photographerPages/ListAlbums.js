import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import useGetPhotographerGallery from '../../hooks/useGetPhotographerGallery';
import { useAuth } from '../../contexts/AuthContext';

const ListAlbums = () => {
	const { gallery, loading } = useGetPhotographerGallery();
	const { currentUser } = useAuth();
	console.log(gallery)
	return (
		<Container className="mt-3">
			<h1>Your Albums</h1>
			{
				loading
					? (<BarLoader color={"purple"} size={15} />)
					: (
						<Row>
							{
								gallery.albums.map((album) => (
									<Col sm={12} md={4} lg={4} key={album.id}>
										<Card>
											<Card.Body>
												<Card.Title>
													<Link to={`/${currentUser.email}/${album.id}`}>
														{album.albumTitle}
													</Link>
												</Card.Title>
											</Card.Body>
										</Card>
									</Col>
								))

							}

						</Row>
					)
			}
		</Container>
	)
}

export default ListAlbums;