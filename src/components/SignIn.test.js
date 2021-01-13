import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from '../contexts/AuthContext';
import SignIn from './SignIn';

describe("SignIn", () => {

	const mockedUser = {
		email: 'test.test@gmail.com', 
		password: 'testPassword'
	}

	it('onchange are beeing called when write in input', async () => {
		const onChange = jest.fn();
		await act(async () => {
			render(
				<AuthContext.Provider value={{ signIn: mockedUser}}>
					<BrowserRouter>
						<SignIn value={''} onChange={onChange}/>
					</BrowserRouter>
				</AuthContext.Provider>
			)
		})
		const emailInput = screen.getByRole('textbox', {type: 'email'});
		
		expect(emailInput.value).toBe('');
		fireEvent.change(emailInput, {
			target: { value: 'text.test@gmail.com' },
		});
		expect(emailInput.value).toBe('text.test@gmail.com');
	});
});