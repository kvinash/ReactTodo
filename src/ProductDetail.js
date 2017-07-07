import React, {Component} from 'react'

//import AddProduct from './AddProduct';
export default class ProductDetail extends Component{
    constructor(props){
        super(props)
        this.state = {
            product: {},
            showList:false,
            id:''
        }
        
    }
    editPro(event) {
        event.preventDefault();
        let name = this.refs.name.value;
        let desc = this.refs.desc.value;
        let price = this.refs.price.value;
        let id = this.state.id;
        let product = {
            id,
            name,
            desc,
            price
        }
        fetch('https://accedo-video-app-api.herokuapp.com/updateProduct', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        }).then(response => {
            console.log(response)
            alert("Product has been updated successfully.Plz check your list")
        }).catch(error => console.log(error))
       // this.refs.productForm.reset()

    }
    componentWillMount(){  
       let id = this.props.match.params.id;
       this.setState({id:id})
       fetch('https://accedo-video-app-api.herokuapp.com/getProduct/'+id+'', {
           method: 'GET',
           headers: { 'Content-Type': 'application/json' },
       }).then((response) => response.json())
           .then((responseJson) => {
               this.setState({showList:true,product: responseJson})
           }).catch(err => {
               console.log(err)
           })
 
    }
    render(){
        if(this.state.showList){
        return(
            
            <div>
                <form ref="productForm"> 
                   Product Name : <input type="text" ref="name" defaultValue={this.state.product[0].name}  placeholder="Enter the product you want to list." /><br />
                   Description: <input type="text" ref="desc"  defaultValue={this.state.product[0].desc} placeholder="Enter the price of the product." /><br />
                   Price:<input type="text" ref="price" defaultValue={this.state.product[0].price} placeholder="Enter the price of the product." /><br />
                <button onClick={this.editPro.bind(this)}>Edit Product</button>
                </form>
            </div>
        );
    } else {
        return(
            <div>Loading.....</div>)
        }
    }
}