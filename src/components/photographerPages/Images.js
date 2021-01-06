import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { SRLWrapper } from 'simple-react-lightbox';

const Images = ({ images }) => {
	return (
		<>
			<SRLWrapper>
				<Row className="my-3">
					{
						images && (
							<>
								{images.map((image, index) => {
								return	<Col sm={6} md={4} lg={3} key={index}>
										<Card className="mb-3">
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
		</>
	)
}

export default Images
