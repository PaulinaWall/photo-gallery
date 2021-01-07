import { createContext, useContext } from 'react';
import { db } from '../firebase';

import useGetPhotographerGallery from '../hooks/useGetPhotographerGallery';

const CustomerContext = createContext();

const useCustomerFunctions = () => {
	return useContext(CustomerContext);
}

const CustomerContextProvider = (props) => {
	const { gallery } = useGetPhotographerGallery();
	
	const createCustomerAlbum = async (images, customerId) => {
		return await db.collection('galleries').doc(gallery.id).get()
		.then((snapshot) => {
			const albums = snapshot.data().albums;
			const cleanedImage = images.map((image) => {
				return {
					...image,
					liked: false,
					checked: false,
				}
			})
			albums.push({
				albumTitle: customerId,
				images: cleanedImage,
			});

			db.collection('galleries').doc(gallery.id).set({
				albums,
			}, {merge: true})
			.then(() => {
				console.log('updated albums successfully', customerId);
			})
			.catch((e) => {
				console.log(e.message);
			})
		})
	}

	const liked = async (customerId, image, currentUser) => {
		return await db.collection('galleries').doc(gallery.id).get()
		.then((snapshot) => {
			const albums = snapshot.data().albums;
			const album = albums.find((album) => album.albumTitle === customerId);
			const imagesArray = album.images;
			const selectedImage = imagesArray[image];
			selectedImage.liked = !selectedImage.liked;
			imagesArray[image] = selectedImage;
			const index = albums.indexOf(album);
			albums[index].images = imagesArray;

			db.collection('galleries').doc(gallery.id).set({
				albums,
				owner: currentUser.uid,
			})
		})
		.catch((e) => {
			console.log(e.message);
		})
	}

	const checked = async (album, image, currentUser) => {
		return await db.collection('galleries').doc(gallery.id).get()
		.then((snapshot) => {
			const albums = snapshot.data().albums;
			const imagesArray = snapshot.data().albums[album].images;
			const selectedImage = snapshot.data().albums[album].images[image];
			selectedImage.checked = !selectedImage.checked;
			imagesArray[image] = selectedImage;
			albums[album].images = imagesArray;

			db.collection('galleries').doc(gallery.id).set({
				albums,
				owner: currentUser.uid,
			})
		})
		.catch((e) => {
			console.log(e.message);
		})
	}

	const contextValues = {
		checked,
		liked,
		createCustomerAlbum,
	}

	return (
		<CustomerContext.Provider value={contextValues}>
			{props.children}
		</CustomerContext.Provider>
	)
}

export { CustomerContext, useCustomerFunctions, CustomerContextProvider as default }