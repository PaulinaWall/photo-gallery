import React from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { uid } from 'uid';

import { useCustomerFunctions } from '../../contexts/CustomerContext';

const Images = ({ images, currentUser }) => {
	const { albumId } = useParams();
	const navigate = useNavigate();
	const { checked } = useCustomerFunctions();

	const handleCheckOnClick = (index) => {
		checked(albumId, index, currentUser);
	}

	const handleCreateCustomerGallery = () => {
		const randomId = uid(10);
		const customerId = randomId.concat(albumId.toString())
		navigate(`/customer/${customerId}`)
	}

	return (
		<Container>
			<SRLWrapper>
				<Row className="my-3">
					{
						images && (
							<>
								{images.map((image, index) => {
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
							</>
						)
					}
				</Row>
			</SRLWrapper>
			<div className="d-flex flex-column">
				<Button className="ml-auto mb-2" onClick={handleCreateCustomerGallery}>Create gallery for customer</Button>
				<Button className="ml-auto">Create new album with marked images</Button>
			</div>
		</Container>
	)
}

export default Images
