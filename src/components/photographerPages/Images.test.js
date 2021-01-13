import React from 'react';
import { render, act, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import Images from './Images';

describe('Images', () => {
	it('schould check button', async () => {
		const album = {
			albumTitle: 'My first album',
			fromCustomer: false,
			images: [
				{title: 'test'},
				{title: 'test2'}
			],
			owner: 'test'
		}
		await act(async () => {
			render(
				<AuthContext.Provider value={{}}>
					<BrowserRouter>
						<Images album={album}/>
					</BrowserRouter>
				</AuthContext.Provider>
			)
		})
	});

})