import { useEffect, useState } from 'react';

import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

const useGetPhotographerGallery = () => {
	const [gallery, setGallery] = useState();
	const [loading, setLoading] = useState(true);
	const { currentUser } = useAuth();
	useEffect(() => {
		const unsubscribe = db.collection('galleries')
		.where('owner', '==', currentUser.uid)
		.onSnapshot(snapshot => {
			setLoading(true);
			let snapshotGallery = {};

			snapshot.forEach(doc => {
				snapshotGallery = {
					id: doc.id,
					...doc.data(),
				}
			})

			setGallery(snapshotGallery)
			setLoading(false)
		});

		return unsubscribe;
	}, [currentUser.uid]);

	return { gallery, loading }
}

export default useGetPhotographerGallery;