import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext';
import CreateAlbum from './CreateAlbum';

describe("CreateAlbum", () => {

	const mockedCurrentUser = {
		uid: 'abcdef1234567',
	}

	it('renders correctly', async () => {
		await act(async () => {
			render(
				<AuthContext.Provider value={{ currentUser: mockedCurrentUser}}>
					<BrowserRouter>
						<CreateAlbum/>
					</BrowserRouter>
				</AuthContext.Provider>
			)
		})
	});

	it('updates input onChange', async () => {
		await act(async () => {
			render(
				<AuthContext.Provider value={{ currentUser: mockedCurrentUser}}>
					<BrowserRouter>
						<CreateAlbum/>
					</BrowserRouter>
				</AuthContext.Provider>
			)
		})
		const input = screen.getByRole('textbox');
		expect(input.value).toBe("");
		fireEvent.change(input, {
			target: { value: 'My new album' },
		});
		expect(input.value).toBe('My new album');
	});

	it('has a button with create text', async () => {
		await act(async () => {
			render(
				<AuthContext.Provider value={{ currentUser: mockedCurrentUser}}>
					<BrowserRouter>
						<CreateAlbum/>
					</BrowserRouter>
				</AuthContext.Provider>
			)
		})
		expect(screen.getByRole('button', {name: 'Create'})).toBeInTheDocument();
	});
});