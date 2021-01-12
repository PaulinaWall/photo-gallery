import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import LandingPage from './LandingPage';

describe("LandingPage", () => {

	it('renders correctly', () => {
		render(
			<MemoryRouter>
				<LandingPage/>
			</MemoryRouter>
		)
	});
	it('links to signup', () => {
		render(
			<MemoryRouter>
				<LandingPage/>
			</MemoryRouter>
		)
		const link = screen.getByText('here')
		expect(link.href).toBe('http://localhost/signup')
	});
});