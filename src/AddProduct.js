import React, {Component} from 'react'
import request from 'superagent'
//import AddProduct from './AddProduct';
export default class AddProduct extends Component{
    constructor(){
        super()
        this.state = {
            product: {}
        }
    }
    /**To Add the product in the product List*/
     addPro(event) {
        event.preventDefault();
        let product = this.state.product;
        product.name = this.refs.name.value;
        product.price = this.refs.price.value;
        product.desc = this.refs.desc.value;
        fetch('https://accedo-video-app-api.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body:JSON.stringify(product)
        }).then(response => {
            console.log(response)
        }).catch(error => console.log(error))
        this.refs.productForm.reset()
    }
    render(){
        return(
            <div>
                <form ref="productForm"> 
                   Product Name : <input type="text" ref="name"  placeholder="Enter the product you want to list." /><br />
                   Description: <input type="text" ref="desc"  placeholder="Enter the price of the product." /><br />
                   Price:<input type="text" ref="price" placeholder="Enter the price of the product." /><br />
                   {/*Add Date:<input type="date" ref="today"  placeholder="date" /><br />*/}
                    <button onClick={this.addPro.bind(this)}>Add product</button>
                </form>
            </div>
        );
    }
}