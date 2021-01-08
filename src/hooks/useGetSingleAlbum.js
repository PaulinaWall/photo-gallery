import { useEffect, useState } from 'react';
import { db } from '../firebase';

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState();

	useEffect(() => {
		db.collection('albums').doc(albumId).get().then(doc => {
			setAlbum({
				id: doc.id,
				...doc.data(),
			})
		})
	}, [albumId])

	return { album };
}

export default useAlbum;