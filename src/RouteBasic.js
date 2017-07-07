import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './bootstrap.css';
import './react-bootstrap-table-all.min.css';
//import AppApi from './AppApi';
import AllList from './AllList';
import AddProduct from './AddProduct';
import ProductDetail from './ProductDetail';
import request from 'superagent'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
const RouteBasic = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">All List</Link></li>
        <li><Link to="/addProduct">Add Product</Link></li>
       
      </ul>

      <hr/>

      <Route exact path="/" component={AllList}/>
      <Route path="/addProduct" component={AddProduct}/>
      <Route path="/editProuct/:id" component={ProductDetail}/>
    </div>
  </Router>
)






export default RouteBasic