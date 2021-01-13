import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useGetImages = (albumId) => {
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState();

	useEffect(() => {
		const unsubscribe = db.collection('albums')
			.doc(albumId)
			.onSnapshot(doc => {
				setLoading(true);

				setImages(doc.data().images);
				setLoading(false);
			});
			return unsubscribe;
	}, [albumId]);

	return {images, loading}
}

export default useGetImages;