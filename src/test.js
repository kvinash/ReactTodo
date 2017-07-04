import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  render() {
    return (
    <form>
      <table style={{border:'1px solid black'}}>
        
      <label>
        <td style={{width:'100px'}}>
        Name:
        </td>
        <input type="text" name="name"/>
      </label>
     
      <br/>
      <label>
         <td style={{width:'100px'}}>
        Designation:
        </td>
        <input type="text" name="des"/>
      </label>
      <br/>
      <label>
         <td style={{width:'100px'}}>
        Experience:
        </td>
        <input type="text" name="exp"/>
      </label>
      <br/>
      <input type="submit" value="submit"/>
      
      </table>
    </form>
    );
  }
}

export default App;
