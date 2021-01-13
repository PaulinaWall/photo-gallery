import { useState, useEffect } from 'react';

import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const useUploadImage = (images, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const { currentUser } = useAuth();

	useEffect(() => {
		if (!images) {
			setUploadProgress(null);
			setUploadedImage(null);
			setError(null);
			setIsSuccess(false);
			return;
		}

		setError(null);
		setIsSuccess(false);

		let fileRef;
		let uploadTask;
		const unsubscribe = images.forEach((image) => {
			fileRef = storage.ref(`images/${currentUser.email}/${image.name}`);

			uploadTask = fileRef.put(image);

			uploadTask.on('state_changed', taskSnapshot => {
				setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
			});

			uploadTask.then(async snapshot => {
	
				const url = await snapshot.ref.getDownloadURL();
	
				const img = {
					name: image.name,
					owner: currentUser.uid,
					path: snapshot.ref.fullPath,
					size: image.size,
					type: image.type,
					checked: false,
					liked: false,
					url,
				};
	
				const unsubscribe = await db.collection('albums').doc(albumId).get()
				.then((snapshot) => {
					const images = snapshot.data().images;
					images.push(img);
					db.collection('albums').doc(albumId).update({
						images,
					})
				})
	
				setIsSuccess(true);
				setUploadProgress(null);
	
				setUploadedImage(img);
				setIsSuccess(true);
				
				return unsubscribe;
	
			}).catch((e) => {
				setError(e.code);
			});
		}) 
		
		return unsubscribe;
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [images, currentUser]);

	return { uploadProgress, uploadedImage, error, isSuccess };
}

export default useUploadImage;
