import React, { useEffect } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const SignOut = () => {
	const { signout } = useAuth()
	const navigate = useNavigate()

	useEffect(() => {
		(async () => {
			await signout()
			navigate('/signin')
		})()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<>
			<Row className="mt-3">
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Sign Out</Card.Title>

							<Card.Text>Please wait while you're being signed out...</Card.Text>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default SignOut
