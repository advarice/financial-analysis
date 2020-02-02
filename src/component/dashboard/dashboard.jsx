import React, {Component} from 'react';
import {Navbar, Container, Row, Col, InputGroup, FormControl, Button} from 'react-bootstrap'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios'
import './earningCalendar/earning-calendar.css'
import './gdp/gdp'
import GDP from "./gdp/gdp";
import EarningCalendar from "./earningCalendar/earning-calendar";
import Card from "react-bootstrap/Card";
class Dashboard extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Container fluid={true}>
                <Row className={'pt-4'}>
                    <Col xl={7}>
                        <Card>
                            <Card.Body>
                                <GDP></GDP>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
                <Row></Row>
                <Row className={'pt-2'}>
                    <Col>
                        <Card className={"w-100 h-auto"}>
                            <Card.Body>

                                <div className={'earning-table'}>
                                    <EarningCalendar ref={this.earningRef}></EarningCalendar>
                                </div>

                            </Card.Body>
                        </Card>
                    </Col>

                </Row>
            </Container>
        );
    }

}


export default Dashboard;