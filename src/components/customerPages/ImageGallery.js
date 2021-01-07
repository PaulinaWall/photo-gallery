import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { SRLWrapper } from 'simple-react-lightbox';
import { Row, Col, Card, Container, Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import useGetImages from '../../hooks/useGetImages';
import { useCustomerFunctions } from '../../contexts/CustomerContext';
import { useAuth } from '../../contexts/AuthContext';

const ImageGallery = () => {
	const { customerId } = useParams();
	const { liked, createCustomerAlbum } = useCustomerFunctions();
	const { currentUser } = useAuth();
	const { images, loading } = useGetImages(customerId);
	const [msg, setMsg] = useState(null);
	const [showModal, setShowModal] = useState(false)

	const filterLikedImages = () => {
		const likedImages = images.filter((image) => image.liked === true);
		return likedImages;
	};

	const handleLikeOnClick = (index) => {
		liked(customerId, index, currentUser);
	};

	const handleSaveOnClick = () => {
		const likedImages = filterLikedImages();
		createCustomerAlbum(likedImages, `Album from customer: ${customerId}`);
		setMsg('Thanks for choosing your favorites!');
		setShowModal(true);
	};
	
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
												onClick={() => handleLikeOnClick(index)}
											/>
										</Card.Header>
										<a href={image.url} title="View image in lightbox" data-attribute="SRL">
											<Card.Img variant="top" src={image.url} title={image.name} />
										</a>
									</Card>
								</Col>
							))
					}
				</Row>
			</SRLWrapper>
			<div className="d-flex">
				{
					!msg
					? 	<Button onClick={handleSaveOnClick} className="ml-auto 			m-3">Send choosen pictures to photographer
						</Button>
					:   <Modal
							size="sm"
							show={showModal}
							aria-labelledby="example-modal-sizes-title-sm"
						>
							<Modal.Header>
							<Modal.Title id="example-modal-sizes-title-sm">
								Thanks
							</Modal.Title>
							</Modal.Header>
							<Modal.Body>{msg}</Modal.Body>
						</Modal>
				}
			</div>
		</Container>
	)
}

export default ImageGallery;