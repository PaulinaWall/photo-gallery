import { useState, useEffect } from 'react';

import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const useUploadImage = (images, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const { currentUser } = useAuth();
	
	useEffect(() => {
		(async () => {
			const uploadedImages = [];
	
			await db.collection('albums').doc(albumId).get()
			.then((doc) => {
				uploadedImages.push(...doc.data().images);
			});
	
			if (!images) {
				setUploadProgress(null);
				//setUploadedImage(null);
				setError(null);
				setIsSuccess(false);
				return;
			}
	
			setError(null);
			setIsSuccess(false);
			
			images.forEach((image) => {
	
				const uploadTask = storage.ref(`images/${currentUser.email}/${image.name}`).put(image);
	
				const unsubscribe = uploadTask.on('state_changed', snapshot => {
					setUploadProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
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
	
					const imageExists = uploadedImages.find((image) => image.path === img.path)
	
					if(!imageExists){
						uploadedImages.push(img);
					}else{
						setError({ msg: `${image.name} (${Math.round(image.size / 1024)} kb) already exists` });
					}
	
					await db.collection('albums').doc(albumId).update({
						images: uploadedImages,
					})
					.then(() => {
						setIsSuccess(true);
						setUploadProgress(null);
					});
	
				}).catch((e) => {
					setError(e.msg);
				});
				return unsubscribe;
			}) 
		})()
		
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [images, currentUser, albumId]);

	return { uploadProgress, error, isSuccess };
}

export default useUploadImage;
