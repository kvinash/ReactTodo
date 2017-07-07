
import React, { Component, Button } from 'react';
//import logo from './logo.svg';

import './App.css';
import './bootstrap.css';
import './react-bootstrap-table-all.min.css';
import { Router, Route, Switch } from 'react-router'
import Progress from 'react-progress';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//<script src="https://npmcdn.com/react-bootstrap-table/dist/react-bootstrap-table.min.js"></script>
var _ = require('underscore')
class AppApi extends Component {

     constructor() {
        super();
        this.addPro = this.addPro.bind(this)
        this.state = {
            products: [],
            title: 'React first working App.',
            counter: 0,
            itCount:0,
            showList: false,
            showUpdate: false
        }
    }
    /**To Add the product in the product List*/
    addPro(event) {
        event.preventDefault();
        let name = this.refs.name.value;
        let price = this.refs.price.value;
        console.log(this.refs.price.counter)
        let counter = 0
        if (this.state.products.length > 0)
            counter = this.state.products[this.state.products.length - 1].counter;
        this.setState({ counter: counter })
        counter++;
        let product = {
            name,
            price,
            counter

        };
        let products = this.state.products;
        products.push(product);
        this.setState({
            products: products
        })
        this.refs.productForm.reset()
    }
     /**To update the product in the product List*/
    updatePro(event) {
      event.preventDefault();
        let name = this.refs.name.value;
        let price = this.refs.price.value;
        let counter = this.state.editCount;
        let product = {
            name,
            price,
            counter

        };
        let products = this.state.products;
        products.forEach(function (prod, index) {
            console.log(prod.counter,prod, counter,product);
            if (prod.counter === counter) {
                /**ES6 solution to copy one object to another */
                Object.assign(prod, product);
                prod == product;
            }
        })
           
        //products.splice(counter-1,1,product)
        console.log(products)
        //products.push(product);
        this.setState({
            showList: true,
            showUpdate: false,
            products: products,
            editCount:0
        })
        this.refs.productForm.reset()
    }
   
    /**To remove the product from the list*/
    removePro(index) {
        let products = this.state.products;
        products = products.filter((product) => { return product.counter !== index })
        this.setState({ products: products })
        this.setState({
            showList: true,
            showUpdate: false,
            products: products,
            editCount:0
        })
        this.refs.productForm.reset()
    }
    /**To edit the input text*/
    editPro(index) {
        let products = this.state.products;
        var nupro = _.find(products, function (product) { return product.counter == index })
        console.log(nupro);
        this.refs.name.value = nupro.name;
        this.refs.price.value = nupro.price;
        this.setState({editCount : index});
        this.setState({showUpdate:true, showList:false})
    }
    /**button coulmn in each row*/
    buttonFunction(cell, row) {
        return <label>
            <button type="button"
                id="editbutton"
                onClick={() => { this.editPro(row.counter) }}
                className="bbtn btn-primary btn-sm">
                edit
                </button>
            <button type="button"
                id="deletebutton"
                onClick={() => { this.removePro(row.counter) }}
                className="bbtn btn-primary btn-sm">
                delete
                </button>
        </label>
    }
    /**TO get List*/
    getList(){
        //return new Promise(function(resolve, reject){
            fetch('https://accedo-video-app-api.herokuapp.com/getProducts')
                .then((response) => response.json())
                .then((responseJson) => {
                    
                    this.setState({ showList:true ,products: responseJson })
                    console.log(responseJson);
                }).catch(err=>{
                    console.log(false)
                })
        //})
    }
    /**TO show all list details from the API */
    allList(){
        let title = this.state.title;
        let products = this.state.products;
        console.log(products)
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
    /**To show the table with add product functionality*/
    listview() {
        let title = this.state.title;
        let products = this.state.products;
        console.log(products)
        return (
            <div className="App">
                <h1>{title}</h1>
                <form ref="productForm">
                    <input type="text" ref="name" placeholder="Enter the product you want to list." /><br/>
                    <input type="text" ref="desc" placeholder="Enter the price of the product." /><br/>
                    <input type="text" ref="price" placeholder="Enter the price of the product." /><br/>
                    <input type="date" ref="date" placeholder="date"/><br/>
                    <button onClick={this.addPro.bind(this)}>Add product</button>
                </form>
                 <BootstrapTable data={products} bordered={true} striped hover>
                    <TableHeaderColumn isKey dataField='counter'>Product Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='desc'>Product Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                    <TableHeaderColumn dataField='created_date'>Product Add Date</TableHeaderColumn>

                    <TableHeaderColumn dataField="button" dataFormat={this.buttonFunction.bind(this)}></TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
    /**To update the table with update product functionality.It activate upon edit event*/
    updateview() {
        let title = this.state.title;
        let products = this.state.products;
        return (
            <div>
                <h1>{title}</h1>
                <form ref="productForm">
                    <input type="text" ref="name" placeholder="Enter the product you want to list." />
                    <input type="text" ref="desc" placeholder="Enter the price of the product." />
                    <input type="text" ref="price" placeholder="Enter the price of the product." />
                    <input type="date" ref="date" placeholder="date" />

                    <button onClick={this.updatePro.bind(this)}>update product</button>
                </form>
                <BootstrapTable data={products} bordered={true} striped hover>
                    <TableHeaderColumn isKey dataField='counter'>Product Id</TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>Product Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='desc'>Product Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='price'>Product Price</TableHeaderColumn>
                    <TableHeaderColumn dataField='created_date'>Product Add Date</TableHeaderColumn>

                    <TableHeaderColumn dataField="button" dataFormat={this.buttonFunction.bind(this)}></TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
    render() {
        // if (this.state.showList) {
        //     return (
        //         <div>
        //             {this.allList()}
        //         </div>
        //     );
        // } else if (this.state.showUpdate) {
        //     return (
        //         <div>
        //             {this.updateview()}
        //         </div>
        //     );
        // }
        return(
            <div>{this.allList()}</div>
        )
    }
}

export default AppApi;
TableHeaderColumn