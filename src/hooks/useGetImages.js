import { useEffect, useState } from 'react';

import useGetPhotographerGallery from '../hooks/useGetPhotographerGallery';
import { db } from '../firebase';

const useGetImages = (customerId) => {
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState();
	const { gallery } = useGetPhotographerGallery();

	useEffect(() => {
		db.collection('galleries').doc(gallery?.id).get()
		.then(doc => {
			const album = doc.data()?.albums?.find((album) => album.albumTitle === customerId);
			setImages(album?.images);
			setLoading(false);
		})
	}, [customerId, gallery])

	return {images, loading}
}

export default useGetImages;