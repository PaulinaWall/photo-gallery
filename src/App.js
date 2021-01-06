import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SimpleReactLightbox from 'simple-react-lightbox'

import './assets/app.scss';
import AuthContextProvider from './contexts/AuthContext';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';
import Navigation from './components/Navigation';
import LandingPage from './components/LandingPage';
import PhotographerLandingPage from './components/photographerPages/PhotographerLandingPage';
import CreateAlbum from './components/photographerPages/CreateAlbum';
import ListAlbums from './components/photographerPages/ListAlbums';
import SingleAlbum from './components/photographerPages/SingleAlbum';
import ImageGallery from './components/customerPages/ImageGallery';

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<SimpleReactLightbox>
				<Routes>
					<Navigation />
					<Container>
							<Route path="/">
								<LandingPage />
							</Route>

							<Route path="/signin">
								<SignIn />
							</Route>

							<Route path="/signup">
								<SignUp />
							</Route>

							<Route path="/signout">
								<SignOut />
							</Route>

							<Route path="/:email">
								<Route path="/" >
									<PhotographerLandingPage />
								</Route>

								<Route path="/:albumId" >
									<SingleAlbum />
								</Route>

								<Route path="/createAlbum" >
									<CreateAlbum />
								</Route>

								<Route path="/listAlbums" >
									<ListAlbums />
								</Route>

							</Route>

							<Route path="*" element={<NotFound />} />
					</Container>
					<Route path="/customer/:customerId">
						<ImageGallery />
					</Route>
				</Routes>
				</SimpleReactLightbox>
			</AuthContextProvider>
		</Router>
	)
}

export default App;