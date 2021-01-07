import { useState, useEffect } from 'react';

import { db, storage } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import useGetPhotographerGallery from '../hooks/useGetPhotographerGallery';

const useUploadImage = (image, albumId = null) => {
	const [uploadProgress, setUploadProgress] = useState(null);
	const [uploadedImage, setUploadedImage] = useState(null);
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const { currentUser } = useAuth();
	const { gallery } = useGetPhotographerGallery();

	useEffect(() => {
		if (!image) {
			setUploadProgress(null);
			setUploadedImage(null);
			setError(null);
			setIsSuccess(false);

			return;
		}

		setError(null);
		setIsSuccess(false);

		const fileRef = storage.ref(`images/${currentUser.uid}/${image.name}`);

		const uploadTask = fileRef.put(image);

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

			await db.collection('galleries').doc(gallery.id).get()
			.then((snapshot) => {
				const albums = snapshot.data().albums;
				const album = snapshot.data().albums[albumId];
				album.images.push(img);
				albums[albumId] = album;
				db.collection('galleries').doc(gallery.id).set({
					owner: currentUser.uid,
					albums
				})
				.then(() => {
					console.log('updated images');
				})
				.catch((e) => {
					setError(e.message);
				});
			})

			setIsSuccess(true);
			setUploadProgress(null);

			setUploadedImage(img);
			setIsSuccess(true);

		}).catch(error => {
			setError(error);
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [image, currentUser]);

	return { uploadProgress, uploadedImage, error, isSuccess };
}

export default useUploadImage;
