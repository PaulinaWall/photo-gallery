import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import AuthContextProvider from '../../contexts/AuthContext';
import CreateAlbum from './CreateAlbum';

describe("CreateAlbum", () => {

	it('renders correctly', async () => {
		const promise = Promise.resolve()
		render(
			<AuthContextProvider>
				<MemoryRouter>
					<CreateAlbum/>
				</MemoryRouter>
			</AuthContextProvider>
		)
		await act(() => promise)
	});
	it('updates input onChange', async () => {
		const promise = Promise.resolve()
		render(
			<AuthContextProvider>
				<MemoryRouter>
					<CreateAlbum/>
				</MemoryRouter>
			</AuthContextProvider>
		)
		await act(() => promise)
		const input = screen.getByRole('textbox');
		expect(input.value).toBe("");
		fireEvent.change(input, {
			target: { value: 'My new album' },
		});
		expect(input.value).toBe('My new album');
	});
});