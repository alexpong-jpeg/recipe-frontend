import React from 'react';
import { Navbar, Nav } from 'react-bootstrap'; // Only needed if using react-bootstrap components

function AppNavbar({ setView, currentView }) {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand style={{ cursor: 'pointer' }} onClick={() => setView('list')}>
        Recipe Manager
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link
            active={currentView === 'list'}
            onClick={() => setView('list')}
          >
            All Recipes
          </Nav.Link>
          <Nav.Link
            active={currentView === 'new'}
            onClick={() => setView('new')}
          >
            New Recipe
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
