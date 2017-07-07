
import React, { Component, Button } from 'react';
//import logo from './logo.svg';

import './App.css';
import './bootstrap.css';
import './react-bootstrap-table-all.min.css';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Progress from 'react-progress';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//<script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js"></script>
var _ = require('underscore')
class AllList extends Component {

    constructor() {
        super();
        this.state = {
            products: [],
            title: 'React first working App.',

        }
    }
    /**To remove the product from the list and the data base*/
    removePro(index) {
        console.log(index)
         fetch('https://accedo-video-app-api.herokuapp.com/deleteProduct/'+index+'', {
            credentials: "same-origin",
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
        }).then(response => {
            this.allList()
            console.log(response)
        }).catch(error => console.log(error))
        
    }
    /**To get the product details from API*/
    getPro(index) {
        let products = this.state.products;
        var nupro = _.find(products, function (product) { return product._id == index })


    }
    /**TO get List*/
    getList() {
        fetch('https://accedo-video-app-api.herokuapp.com/getProducts')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ showList: true, products: responseJson })   
            }).catch(err => {
                console.log(false)
            })
    }
     /**button coulmn in each row*/
    buttonFunction(cell, row) {
        return <label>

            <Route>
                <button type="button"
                    id="getButton"
                    onClick={() => { console.log("hello")}}
                    ><Link to={`/editProuct/${row._id}`}>Edit Product</Link>
                    </button>
                </Route>
            
            <button type="button"
                id="deletebutton"
                onClick={() => { this.removePro(row._id) }}
               >
                delete
            </button>
        </label>
    }

    /**TO show all list details from the API */
    allList() {
        let title = this.state.title;
        let products = this.state.products;
        this.getList()
        if (this.state.showList) {
            return (
                <div className="App">
                    <BootstrapTable data={products} bordered={true} striped hover>
                        <TableHeaderColumn isKey dataField='_id'>Product Id</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                        <TableHeaderColumn dataField='desc'>Product Description</TableHeaderColumn>
                        <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                        <TableHeaderColumn dataField='created_date'>Product Add Date</TableHeaderColumn>
                        <TableHeaderColumn dataField="button" dataFormat={this.buttonFunction.bind(this)}></TableHeaderColumn>
                    </BootstrapTable>
                </div>
            )
        } else {
            return (
                <div>
                    <Progress percent={50} />
                </div>
            )
        }
    }


    render() {
        return (
            <div>{this.allList()}</div>
        )
    }
}

export default AllList;
