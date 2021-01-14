import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const ImageCard = ({ album, image, handleOnDelete, handleCheckOnClick }) => {
	return (
		<Card className="mb-3">				
			<Card.Header>
			{
				(!album.fromCustomer) &&
					<div className="d-flex justify-content-between">
						{
							!album.toCustomer && 
								<FontAwesomeIcon
									className={image.checked ? 'checkedIcon' : 'unCheckedIcon'} 
									icon={faCheck} 
									onClick={handleCheckOnClick}
								/>
						}
						<FontAwesomeIcon
							className="delete-icon"
							icon={faTimes} 
							onClick={handleOnDelete}
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
	)
}

export default ImageCard;