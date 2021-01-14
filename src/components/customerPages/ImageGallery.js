import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { SRLWrapper } from 'simple-react-lightbox';
import { Row, Col, Container, Button, Modal, Alert } from 'react-bootstrap';

import useGetImages from '../../hooks/useGetImages';
import useGetSingleAlbum from '../../hooks/useGetSingleAlbum';
import { db } from '../../firebase';
import LikedNumber from './LikedNumber';
import ImageCard from './ImageCard';

const ImageGallery = () => {
	const { albumId } = useParams();
	const { images, loading } = useGetImages(albumId);
	const { album } = useGetSingleAlbum(albumId);
	const [msg, setMsg] = useState(null);
	const [error, setError] = useState();
	const [showModal, setShowModal] = useState(false);
	const [sendError, setSendError] = useState();

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

	const handleLikeOnClick = async (index) => {
		setSendError(false);
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
			});
		} catch(e) {
			setError(e.message);
		}
	};

	const handleSaveOnClick = () => {
		const likedImages = filterLikedImages();
		if(!likedImages.length){
			setSendError('Please choose atleast one image!')
		}else{
			createNewAlbum(likedImages);
			setMsg('Thanks for choosing your favorites!');
			setShowModal(true);
		}
	};

	return(
		<Container>
			{
				error && <Alert className="mt-3" variant="danger">{error}</Alert>
			}
			{loading && (<div className="d-flex justify-content-center my-5"><BarLoader color={"#888"} size={100} /></div>)}
			<SRLWrapper>
				<Row className="mt-3">
					{
						images && 
							images.map((image, index) => (
								<Col sm={6} md={4} lg={3} key={index}>
									<ImageCard 
										image={image} 
										handleLikeOnClick={() => handleLikeOnClick(index)} 
									/>
								</Col>
							))
					}
				</Row>
			</SRLWrapper>
			<div className="mt-5 d-flex flex-column align-items-end">
			
				{
					loading 
						? <div className="d-flex justify-content-center my-5"><BarLoader color={"#888"} size={100}/></div>
						: <LikedNumber images={images}/>
				}
				{
					sendError && <Alert className="mt-3" variant="danger">{sendError}</Alert>
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