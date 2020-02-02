import React, {Component} from 'react';
import axios from "axios";
import './stockModal.css';
import './../../gdp/gdp'
import {Button, Modal, Row} from 'react-bootstrap';
import GDP from "../../gdp/gdp";
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import addHighchartsMore from 'highcharts/highcharts-more';
import Indicators from 'highcharts/indicators/indicators';
import IndicatorsAll from 'highcharts/indicators/indicators-all';
import PriceIndicator from 'highcharts/modules/price-indicator';
import StockTools from 'highcharts/modules/stock-tools';

Indicators(Highcharts);
IndicatorsAll(Highcharts);
PriceIndicator(Highcharts);
addHighchartsMore(Highcharts);
var vbp = require('highcharts/indicators/volume-by-price');
vbp(Highcharts);

class StockModal extends Component{

    constructor(props) {
        super(props);

        console.log(props)
        this.state ={
            show:false,
            data:props.data
        }
    }


    render(){

        console.log(this.state);

        return(
            <Modal show={this.state.show}
                   onHide={this.handleClose}
                   dialogClassName="modal-90w"
                   aria-labelledby="example-custom-modal-styling-title"
                   animation={true}

            >
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.data}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <HighchartsReact
                        highcharts={Highcharts}
                        constructorType={'stockChart'}
                        options={this.state.options}
                    />

                </Modal.Body>
{/*                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>*/}
            </Modal>
        )
    }

    renderChart = () =>{


        return(
            <div id={'container'}>Dsa</div>
        )
    }

    handleClose = () =>
    {


        this.setState({show:false});
    };

    handleShow = () =>{
        this.setState({show:true});
    };


    componentDidMount() {
        const data = axios.get('http://localhost:5000/summary/stock?stockSymbol=NVDA')
            .then(response => {

                var keys = Object.keys(response.data);
                this.setState({stockSummary: response.data.candleData})


                var ohlc = [];
                var volume =[];

                console.log(this.state);
                var groupingUnits =  [[
                    'week',                         // unit name
                    [1]                             // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]];

                for(var i =0;i<this.state.stockSummary.length;i++){
                    ohlc.push(
                        [
                            this.state.stockSummary[i].date,
                            this.state.stockSummary[i].candle.open,
                            this.state.stockSummary[i].candle.high,
                            this.state.stockSummary[i].candle.low,
                            this.state.stockSummary[i].candle.close
                        ]
                    );
                    volume.push([
                        this.state.stockSummary[i].date,
                        this.state.stockSummary[i].candle.volume
                    ]);
                }

                const options: Highcharts.Options = {
                    rangeSelector: {
                        selected: 2
                    },

                    title: {
                        text: 'NVDA Historical'
                    },

                    subtitle: {
                        text: 'With SMA and Volume by Price technical indicators'
                    },

                    yAxis: [{
                        startOnTick: false,
                        endOnTick: false,
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'OHLC'
                        },
                        height: '60%',
                        lineWidth: 2,
                        resize: {
                            enabled: true
                        }
                    }, {
                        labels: {
                            align: 'right',
                            x: -3
                        },
                        title: {
                            text: 'Volume'
                        },
                        top: '65%',
                        height: '35%',
                        offset: 0,
                        lineWidth: 2
                    }],

                    tooltip: {
                        split: true
                    },

                    plotOptions: {
                        series: {
                            dataGrouping: {
                                units: groupingUnits
                            }
                        }
                    },

                    series: [{
                        type: 'candlestick',
                        name: 'AAPL',
                        id: 'aapl',
                        zIndex: 2,
                        data: ohlc
                    }, {
                        type: 'column',
                        name: 'Volume',
                        id: 'volume',
                        data: volume,
                        yAxis: 1
                    }, {
                        type: 'vbp',
                        linkedTo: 'aapl',
                        params: {
                            volumeSeriesID: 'volume'
                        },
                        dataLabels: {
                            enabled: false
                        },
                        zoneLines: {
                            enabled: false
                        }
                    }, {
                        type: 'sma',
                        linkedTo: 'aapl',
                        zIndex: 1,
                        marker: {
                            enabled: false
                        }
                    }]
                };

                this.setState({options:options})
            })
    }


}
export default  StockModal;