import { useState, useEffect } from 'react';

import { db } from '../firebase';

const useSetCheckedImages = (index, albumId) => {
	const [errorChecked, setErrorChecked] = useState(false);
	useEffect(() => {
		let mounted = true;
		if(!index && index !== 0){
			return;
		}

		if(mounted){
			db.collection('albums').doc(albumId).get().then((doc) => {
				const images = doc.data().images;
				const image = doc.data().images[index];
				image.checked = !image.checked;
				images[index] = image;
				db.collection('albums').doc(albumId).set({
					...doc.data(),
					images,
				});
			})
			.catch((e) => {
				setErrorChecked(e.message);
			});
		}

		return () => mounted = false;
			
		
	}, [index])

	return { errorChecked }

}

export default useSetCheckedImages;