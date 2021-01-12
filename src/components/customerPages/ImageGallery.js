import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader, CircleLoader } from 'react-spinners';
import { SRLWrapper } from 'simple-react-lightbox';
import { Row, Col, Card, Container, Button, Modal, Alert, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import useGetImages from '../../hooks/useGetImages';
import useGetSingleAlbum from '../../hooks/useGetSingleAlbum';
import { db } from '../../firebase';

const ImageGallery = () => {
	const { albumId } = useParams();
	const { images, loading } = useGetImages(albumId);
	const { album } = useGetSingleAlbum(albumId);
	const [msg, setMsg] = useState(null);
	const [error, setError] = useState();
	const [showModal, setShowModal] = useState(false)
	const numberOfLikes = useRef(0);

	useEffect(() => {
		let likes = 0;
		images?.forEach((image) => {
			if(image.liked){
				likes ++;
			}
		})
		numberOfLikes.current = likes;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const filterLikedImages = () => {
		const likedImages = images.filter((image) => image.liked === true);
		likedImages.forEach((image) => {
			image.liked = false;
		})
		return likedImages;
	};

	const createNewAlbum = async (likedImages) => {
		try{
			await db.collection('albums').add({
				owner: album.owner,
				fromCustomer: true,
				albumTitle: album.albumTitle,
				images: likedImages,
			})
		} catch (e) {
			setError(e.message);
		}
	}

	const countNumberOfLikes = (image) => {
		if(image === true){
			numberOfLikes.current ++;
		} else {
			if(numberOfLikes.current === 0){
				return;
			}
			numberOfLikes.current --;
		}
	};

	const handleLikeOnClick = async (index) => {
		try{
			await db.collection('albums').doc(albumId).get().then((doc) => {
				const images = doc.data().images;
				const image = doc.data().images[index];
				image.liked = !image.liked;
				images[index] = image;
				db.collection('albums').doc(albumId).set({
					...doc.data(),
					images,
				});
				countNumberOfLikes(image.liked);
			});
		} catch(e) {
			setError(e.message);
		}
	};

	const handleSaveOnClick = () => {
		const likedImages = filterLikedImages();
		createNewAlbum(likedImages);
		setMsg('Thanks for choosing your favorites!');
		setShowModal(true);
	};

	return(
		<Container>
			{
				error && <Alert variant="danger">{error}</Alert>
			}
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
			<div className="m-5">
				{
					<p>You liked: {numberOfLikes.current} pictures of {images?.length}!</p>
				}
				{
					!msg
					? 	<Button onClick={handleSaveOnClick}>Send pictures to photographer.
						</Button>
					:   <Modal
							animation={false}
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