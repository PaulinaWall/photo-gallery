import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<Navigation />
				<Container>
					<Routes>
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
							<Route to="/" >
								<PhotographerLandingPage />
							</Route>

							<Route path="/createAlbum" >
								<CreateAlbum />
							</Route>

							<Route path="/listAlbums" >
								<ListAlbums />
							</Route>
						</Route>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
			</AuthContextProvider>
		</Router>
	)
}

export default App;