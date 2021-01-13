import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
 
const AlbumCard = ({ album, handleDeleteOnClick, currentUser, handleShow }) => {
	return (
		<Card className="album-card">
			<div className="mb-2 ml-auto pt-2 pr-2">
				<FontAwesomeIcon
					className="delete-icon"
					icon={faTimes} 
					onClick={handleDeleteOnClick}
				/>
			</div>
			<Link className="mb-3 albumList-links" to={`/${currentUser.email}/${album.id}`}>
				<Card.Body className="pb-0 pt-0">
					<Card.Title className="album-card-title">
						<div className="card-title album-links">
							
								{
									album.fromCustomer && 
										<p>Customer Album:</p>
								}
								{album.albumTitle}
						</div>
					</Card.Title>
				</Card.Body>
			</Link>
			<Button className="m-3" onClick={handleShow}>Change Album Title</Button>
		</Card>
	)
}

export default AlbumCard;