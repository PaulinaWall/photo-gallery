import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import useGetImages from '../../hooks/useGetImages';

const ImageGallery = () => {
	const { customerId } = useParams();
	const { images, loading } = useGetImages(customerId);
	const [checked, setChecked] = useState();
	
	return(
		<>
			{loading && (<div className="d-flex justify-content-center my-5"><BarLoader color={"#888"} size={100} /></div>)}
			<Row className="mt-3">
			{
				images && 
					images.map((image, index) => (
						<Col sm={6} md={4} lg={3} key={index}>
							<Card className="mb-3">
								<Card.Header>
									<FontAwesomeIcon
										className={checked ? 'checkedIcon' : 'unCheckedIcon'} 
										icon={faHeart} 
										onClick={() => setChecked(!checked)}
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
		</>
	)
}

export default ImageGallery;