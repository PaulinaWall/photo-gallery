import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import LandingPage from './LandingPage';

describe("LandingPage", () => {

	it('renders correctly', () => {
		render(
			<BrowserRouter>
				<LandingPage/>
			</BrowserRouter>
		)
	});
	it('links to signup', () => {
		render(
			<BrowserRouter>
				<LandingPage/>
			</BrowserRouter>
		)
		const link = screen.getByText('here');
		expect(link.href).toBe('http://localhost/signup');
	});
});