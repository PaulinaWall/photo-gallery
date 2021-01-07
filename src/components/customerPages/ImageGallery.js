import React from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { SRLWrapper } from 'simple-react-lightbox';
import { Row, Col, Card, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import useGetImages from '../../hooks/useGetImages';
import { useCustomerFunctions } from '../../contexts/CustomerContext';
import { useAuth } from '../../contexts/AuthContext';

const ImageGallery = () => {
	const { customerId } = useParams();
	const { liked } = useCustomerFunctions();
	const { currentUser } = useAuth();
	const albumId = customerId.slice(-1);
	const { images, loading } = useGetImages(albumId);

	const handleOnClick = (index) => {
		liked(albumId, index, currentUser);
	}
	
	return(
		<Container>
			{loading && (<div className="d-flex justify-content-center my-5"><BarLoader color={"#888"} size={100} /></div>)}
			<SRLWrapper>
				<Row className="mt-3">
					{
						images && 
							images.map((image, index) => (
								<Col sm={6} md={4} lg={3} key={index}>
									<Card className="mb-3">
										<Card.Header>
											<FontAwesomeIcon
												className={image.liked ? 'likedIcon' : 'unLikedIcon'} 
												icon={faHeart} 
												onClick={() => handleOnClick(index)}
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
							))
					}
				</Row>
			</SRLWrapper>
			<div className="d-flex">
				<Button className="ml-auto mt-3">Send choosen pictures to photographer</Button>
			</div>
		</Container>
	)
}

export default ImageGallery;