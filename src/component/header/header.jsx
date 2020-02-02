import React, {Component} from 'react';
import {Navbar, Container, NavDropdown, Nav } from 'react-bootstrap'
import { render } from 'react-dom';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class Header extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">
                    Financial Dashboard
                </Navbar.Brand>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#pricing">Admin</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Dank memes
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>



        );
    }
}

const options = {
    chart: {
        type: 'spline'
    },
    title: {
        text: 'My chart'
    },
    series: [
        {
            data: [1, 2, 1, 4, 3, 6]
        }
    ]
};

export default Header;