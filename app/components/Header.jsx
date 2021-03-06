import React, { PropTypes } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Header = ({ username }) => (
    <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                <a href="/">Odot</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>

        <Navbar.Collapse>
            <Navbar.Text>
                <strong>{username}</strong>
            </Navbar.Text>

            <Navbar.Text>
                <Navbar.Link href="/logout">Logout</Navbar.Link>
            </Navbar.Text>
        </Navbar.Collapse>
    </Navbar>
)

Header.propTypes = {
    username: PropTypes.string.isRequired,
}

export default Header
