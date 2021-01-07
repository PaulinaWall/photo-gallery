import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { Container } from 'react-bootstrap';

import { db } from '../../firebase';
import UploadImages from './UploadImages';
import Images from './Images';
import useGetPhotographerGallery from '../../hooks/useGetPhotographerGallery';
import { useAuth } from '../../contexts/AuthContext';

const SingleAlbum = () => {
	const { albumId } = useParams();
	const [singleAlbum, setSingleAlbum] = useState();
	const [images, setImages] = useState([]);
	const [loading, setLoading] = useState(true);
	const { gallery } = useGetPhotographerGallery();
	const { currentUser } = useAuth();

	useEffect(() => {
		db.collection('galleries').doc(gallery?.id).get()
		.then(doc => {
			setSingleAlbum({
				id: albumId,
				...doc.data()?.albums[albumId],
			})
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [albumId])

	useEffect(() => {
		const unsubscribe = db.collection('galleries')
			.where('owner', '==', currentUser.uid)
			.onSnapshot(snapshot => {
				setLoading(true);
				let imgs;

				snapshot.forEach(doc => {
					imgs = doc.data().albums[albumId].images;
				});

				setImages(imgs);
				setLoading(false);
			});

		return unsubscribe;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [albumId]);
	return (
		<Container>
			<h2 className="mb-3">Album: {singleAlbum && singleAlbum.albumTitle}</h2>

			<UploadImages albumId={albumId} />

			<hr />

			{loading
				? (<div className="d-flex justify-content-center 		my-5"><BarLoader color={"#888"} size={100} /></div>)
				: (<Images images={images} />)
			}
		</Container>
	)
}

export default SingleAlbum