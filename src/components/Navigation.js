import logo from '../favicon.png'
import React from 'react'
import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar } from 'react-bootstrap'

class Navigation extends Component {
    render() {
        return (
        <div>
            <Navbar bg="dark" variant="dark" sticky="top" expand="md" collapseOnSelect>
            <Navbar.Brand href="/">
                <img src={logo} width="50px" />
                Retail Blogs Site
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
                <Nav>
                    <Nav.Link href="Product-Description"> PRODUCT DESCRIPTION</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </div>
        )
    }
}

export default Navigation