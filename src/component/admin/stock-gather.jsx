import React, {Component} from 'react';
import {Form,Button, Container} from "react-bootstrap";
import axios  from 'axios'


class StockGather extends Component {

    state={
        stockSymbol:""
    }

    render() {
        return (
            <Container>
                <Form className="pt-4">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Stock Data Load</Form.Label>
                        <Form.Control type="data" placeholder="enter stock symbol" onChange={this.handleChange} value={this.state.stockSymbol}/>
                        <Form.Text className="text-muted">
                            Will Insert granular data into database.
                        </Form.Text>
                    </Form.Group>
                    <Button onClick={this.loadData} variant="primary" >
                        Submit
                    </Button>
                </Form>
            </Container>
        );
    }

    loadData = (e)=>{
        let url = 'http://localhost:5000/loadStockInfoTodb';
        var data = {stockTicker: this.state.stockSymbol}
        console.log(this.state.stockSymbol);
        axios.post(url,this.state.stockSymbol, {headers: {"Content-Type": "application/json"}})
            .then(response=>{
                console.log(response);
            }, error=>{
                console.log(error)
            })
    };

    handleChange = ( e ) =>{


        this.setState({stockSymbol: e.target.value})
    }
}

export default StockGather