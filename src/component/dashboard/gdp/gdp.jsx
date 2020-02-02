import React, {Component} from 'react';
import {Navbar, Container,Row, Col } from 'react-bootstrap'
import Highcharts from 'highcharts';
import axios from 'axios'

class GDP extends Component {


    render() {
        return (
            <div id="container"></div>
        );
    }

    state = {
    };

    componentDidMount() {
        const data =axios.get('http://localhost:5000/testMacro')
            .then(response=>{

                var keys = Object.keys(response.data);



                this.setState({countryGDPData:response.data})

                Highcharts.chart('container', {

                    title: {
                        text: 'World GDP data'
                    },

                    subtitle: {
                        text: 'Source: https://www.worldbank.org/'
                    },

                    yAxis: {
                        title: {
                            text: 'USD'
                        }
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle'
                    },

                    plotOptions: {
                        series: {
                            label: {
                                connectorAllowed: false
                            },
                            pointStart: 1960
                        }
                    },

                    series: response.data,

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: 'horizontal',
                                    align: 'center',
                                    verticalAlign: 'bottom'
                                }
                            }
                        }]
                    }

                });


            });

    }
}

export default GDP;