import { useEffect } from 'react';
import { db, storage } from '../firebase';

const useDeleteAlbum = (album) => {
	useEffect(() => {
		if(!album){
			return
		}

		const unsubscribe = (async () => {
			await db.collection('albums').doc(album.id)
			.get()
			.then( async (doc) => {
				const images = doc.data().images;
				await db.collection('albums').doc(album.id).delete();

				await db.collection('albums').get().then(async (querySnapshot) => {
					const albums = [];
					const includesArray = [];
					querySnapshot.forEach((doc) => {
						if(doc.id !== album.id){
							albums.push(doc.data());
						}
					});

					images.forEach(async (image) => {
						albums.forEach((docAlbum) => {
							includesArray.push(docAlbum.images.some((imageInDocAlbum) => imageInDocAlbum.path === image.path));
						});
						if(includesArray.includes(true)) {
							return
						} else {
							await storage.ref(image.path).delete();
						}
					});
				
				});
			});
		})();

		return unsubscribe;

	}, [album]);

	return {}
}

export default useDeleteAlbum
