import React,{ useRef, useState }  from 'react'
import { Row, Col, Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const SignIn = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(null);
	const { signin } = useAuth();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		setError(null);

		try {
			setLoading(true)
			await signin(emailRef.current.value, passwordRef.current.value)
			navigate(`/${emailRef.current.value}`)
		} catch (e) {
			setError(e.message)
			setLoading(false)
		}
	}
	return (
		<>
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Sign In</Card.Title>

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

								<Button className="button" disabled={loading} type="submit">Sign in</Button>

							</Form>
						</Card.Body>
					</Card>
					<div className="text-center mt-2" >
						No account? <Link to="/signup">Sign Up?</Link>
					</div>
				</Col>
			</Row>
		</>
	)
}

export default SignIn
