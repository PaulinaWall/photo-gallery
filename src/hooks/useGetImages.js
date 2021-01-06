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
			setImages(doc.data()?.albums[customerId].images);
			setLoading(false);
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customerId, gallery])

	return {images, loading}
}

export default useGetImages;