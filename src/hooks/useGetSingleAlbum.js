import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useGetSingleAlbum = (albumId) => {
	const [album, setAlbum] = useState();
	const [loadingAlbum, setLoadingAlbum] = useState(true);

	useEffect(() => {
		const unsubscribe = db.collection('albums').doc(albumId).onSnapshot(snapshot => {
			setLoadingAlbum(true)
			setAlbum(snapshot.data());
			setLoadingAlbum(false)
		})

		return unsubscribe;
	}, [albumId])

	return { album, loadingAlbum };
}

export default useGetSingleAlbum;