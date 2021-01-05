import React, { useState, useRef } from 'react';
import { Row, Col, Button, Card, Alert, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { signup } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if(passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('The passwords does not match');
		};

		setError(null);

		try {
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
			navigate('/signin');
		} catch (e) {
			setError(e.message);
			setLoading(false);
		};
	};

	return ( 
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Sign Up</Card.Title>

							{error && (<Alert variant="danger">{error}</Alert>)}

							<Form onSubmit={handleSubmit}>

								<Form.Group id="email">
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" ref={emailRef} required />
								</Form.Group>

								<Form.Group id="password">
									<Form.Label>Password</Form.Label>
									<Form.Control type="password" ref={passwordRef} required />
								</Form.Group>

								<Form.Group id="password-confirm">
									<Form.Label>Password Confirmation</Form.Label>
									<Form.Control type="password" ref={passwordConfirmRef} required />
								</Form.Group>

								<Button className="button" disabled={loading} type="submit">Create Account</Button>

							</Form>
						</Card.Body>
					</Card>
					<div className="text-center mt-2">
						Already have an account? <Link to="/signin">Sign In</Link>
					</div>
				</Col>
			</Row>
		</>
	 );
}
 
export default SignUp;