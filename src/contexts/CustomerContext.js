import { createContext, useContext } from 'react';
import { db } from '../firebase';

import useGetPhotographerGallery from '../hooks/useGetPhotographerGallery';

const CustomerContext = createContext();

const useCustomerFunctions = () => {
	return useContext(CustomerContext);
}

const CustomerContextProvider = (props) => {
	const { gallery } = useGetPhotographerGallery();

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
	}

	return (
		<CustomerContext.Provider value={contextValues}>
			{props.children}
		</CustomerContext.Provider>
	)
}

export { CustomerContext, useCustomerFunctions, CustomerContextProvider as default }