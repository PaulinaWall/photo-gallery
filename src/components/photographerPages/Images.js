import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Container } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';

const Images = ({ images }) => {
	const { albumId } = useParams();
	const [checked, setChecked] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {

	}, [checked])

	const handleCheckOnClick = (index) => {
		setChecked(!checked)
		console.log(images[index])
	}

	const handleCreateCustomerGallery = () => {
		navigate(`/customer/${albumId}`)
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
													className={checked ? 'checkedIcon' : 'unCheckedIcon'} 
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
