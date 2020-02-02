import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";
import  StockGather from "./component/admin/stock-gather"
import Dashboard from "./component/dashboard/dashboard";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
function App() {
  return (
      <BrowserRouter>
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
              Financial Dashboard
            </Navbar.Brand>
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/admin">Admin</Nav.Link>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Dank memes
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Route path={"/dashboard"} component={Dashboard}></Route>

          <Route path={"/admin"} component={StockGather}></Route>
        </div>
      </BrowserRouter>
  );
}

export default App;
