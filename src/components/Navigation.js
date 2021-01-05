/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {

	const { currentUser } = useAuth();

	return (
		<div>
			<Navbar bg="light" variant="light" >
				<Container>
					<Link to="/">Photo-gallery</Link>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							{
								currentUser ? (
									<NavDropdown title={'Menu'} id="basic-nav-dropdown">
										<NavLink to="/photographer" className="dropdown-item">Home</NavLink>
										<NavDropdown.Divider />
										<NavLink to="/signout" className="dropdown-item">Sign Out</NavLink>
									</NavDropdown>
								) : (
									<NavLink to="/signin" className="nav-link">Sign In</NavLink>
								)
							}
						</Nav>
					</Navbar.Collapse>
					
				</Container>
			</Navbar>
		</div>
	)
}

export default Navigation
