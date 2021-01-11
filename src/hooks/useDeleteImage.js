import { useEffect } from 'react';
import { db, storage } from '../firebase';

const useDeleteImage = (imageIndex, albumId) => {

	useEffect(() => {
		if (!imageIndex) {
			return;
		}
		const unsubscribe = (async () => {
			await db.collection('albums').doc(albumId).get().then( async (doc) => {
				const images = doc.data().images;
				images.splice(imageIndex, 1)
				const image = doc.data().images[imageIndex];

				db.collection('albums').doc(albumId).set({
					...doc.data(),
					images,
				});
				
				await db.collection('albums').get().then(async (querySnapshot) => {
					const includesArray = []; 
					querySnapshot.forEach((doc) => {
						includesArray.push(doc.data().images.some((imageInArray) => imageInArray.path === image.path));
					});
					if(includesArray.includes(true)) {
						return
					} else {
						await storage.ref(image.path).delete();
					}
				})
				
			})

		})();

		return unsubscribe;

	}, [imageIndex, albumId]);

	return {}
}

export default useDeleteImage
