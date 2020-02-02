import React, {Component} from 'react';
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-balham.css'
import axios from "axios";
import {InputGroup, Row, FormControl, Col, Button, Modal} from 'react-bootstrap'
import Card from "react-bootstrap/Card";
import './modal/stockModal'
import StockModal from "./modal/stockModal";

class EarningCalendar extends Component {


    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
        this.modalRef = React.createRef();


        this.state = {
            show: false,
            columnDefs: [{
                headerName: "Stock", field: "stock_symbol", sortable: true, filter: true, width: '100', resizable: true
            }, {
                headerName: "Earning Date", field: "date", sortable: true, filter: true, width: '120'
            }, {
                headerName: "Name", field: "name", sortable: true, filter: true, width: '300'
            }, {
                headerName: "Industry", field: "industry", sortable: true, filter: true
            }, {
                headerName: "Market Cap", field: "market_cap", sortable: true, filter: true
            }, {
                headerName: "PE Ratio", field: "pe_ratio", sortable: true, filter: 'agNumberColumnFilter'
            }, {
                headerName: "Frd 1 Year PE Ratio",
                field: "frd_1yr_pe_ratio",
                sortable: true,
                filter: 'agNumberColumnFilter'
            }, {
                headerName: "EPS", field: "eps", sortable: true, filter: true
            }, {
                headerName: "News Score", field: "new_sentiment.companyNewsScore", sortable: true, filter: true
            }, {
                headerName: "News Buzz", field: "new_sentiment.buzz.buzz", sortable: true, filter: true
            }, {
                headerName: "Sector Bullish Score",
                field: "new_sentiment.sectorAverageBullishPercent",
                sortable: true,
                filter: true
            }, {
                headerName: "Yield", field: "yield", sortable: true, filter: true
            }, {
                headerName: "Yield", field: "yield", sortable: true, filter: true
            }]
        }
    }

    componentDidMount() {
        const data = axios.get('http://localhost:5000/getRecentEarning')
            .then(response => {

                    console.log(response)
                    this.setState({rowData: response.data})
                }
            )

        this.gridRef.current.defaultColDef = {
            resizable: true
        }
    }

    render() {

        return (

            <div>
                <Row>
                    <Col md={4}>
                        <div className={'pt-2'}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="inputGroup-sizing-sm">Quick Filter</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id={"filter-text-box"} onChange={this.onFilterTextBoxChanged}
                                             aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                            </InputGroup>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <Button size={'sm'} variant="outline-primary" onClick={this.resetAllFilter}>Reset Filter</Button>
                        </div>
                    </Col>
                </Row>
                <Row>

                </Row>
                <div
                    className="ag-theme-balham"
                    style={{
                        height: '500px',
                        width: '100%'
                    }}>
                    <AgGridReact
                        ref={this.gridRef}
                        defaultColDef={{resizable: true}}
                        rowSelection={"multiple"}
                        onGridReady={this.gridRef}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}>
                    </AgGridReact>
                </div>

                <StockModal
                    data={"dsadsafaf"}
                    ref={this.modalRef}
                >
                </StockModal>
                <Button onClick={this.toggleModal}>Click</Button>

            </div>

        );
    }

    toggleModal = () => {
        this.modalRef.current.handleShow();
    }

    onFilterTextBoxChanged = () => {
        console.log("dasd");
        this.gridRef.current.api.setQuickFilter(document.getElementById("filter-text-box").value);
    }

    resetAllFilter = () => {
        this.gridRef.current.api.setFilterModel(null);
    }


}

export default EarningCalendar;