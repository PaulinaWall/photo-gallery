import React, { useEffect, useState } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

import { db } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';

const ListAlbums = () => {
	const [albums, setAlbums] = useState([]);
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();

	useEffect(() => {
		const unsubscribe = db.collection('albums')
		.onSnapshot(snapshot => {
			setLoading(true)
			const snapshotAlbums = []

			snapshot.forEach(doc => {
				snapshotAlbums.push({
					id: doc.id,
					...doc.data(),
				})
			})

			setAlbums(snapshotAlbums)
			setLoading(false)
		});

		return unsubscribe;
	}, [])

	return (
		<Container className="mt-3">
			<h1>Your Albums</h1>
			{
				loading
					? (<BarLoader color={"purple"} size={15} />)
					: (
						<Row>
							{
								albums.map((album) => (
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