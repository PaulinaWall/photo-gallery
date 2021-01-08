import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useGetImages = (albumId) => {
	const [loading, setLoading] = useState(true);
	const [images, setImages] = useState();

	useEffect(() => {
		const unsubscribe = db.collection('images')
			.where('album', '==', db.collection('albums').doc(albumId))
			.orderBy("name")
			.onSnapshot(snapshot => {
				setLoading(true);
				const imgs = [];

				snapshot.forEach(doc => {
					imgs.push({
						id: doc.id,
						...doc.data(),
					});
				});

				setImages(imgs);
				setLoading(false);
			});

		return unsubscribe;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [albumId]);

	return {images, loading}
}

export default useGetImages;