import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const ImageCard = ({ image, handleLikeOnClick }) => {

	return (
		<Card className="mb-3">
			<Card.Header>
				<FontAwesomeIcon
					className={image.liked ? 'likedIcon' : 'unLikedIcon'} 
					icon={faHeart} 
					onClick={handleLikeOnClick}
				/>
			</Card.Header>
			<a href={image.url} title="View image in lightbox" data-attribute="SRL">
				<Card.Img variant="top" src={image.url} title={image.name} />
			</a>
		</Card>
	)
}

export default ImageCard;