import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'react-bootstrap-table-all.min.css';
class App extends Component {
  addTodo(event){
   console.log(event)
    event.preventDefault();
    let name = this.refs.name.value;
    let completed  = this.refs.completed.value;
    let counter = 0
    if(this.state.todos.length>0)
    counter = this.state.todos[this.state.todos.length-1].counter;
    this.setState({counter:counter})
    counter ++;
    let todo = {
      name, 
      completed,
      counter
    }; 
    let todos = this.state.todos;
    todos.push(todo);
    console.log(todos)
    this.setState({
      todos:todos
    })
     this.refs.todoForm.reset;
  }
  removeTodo(index){
    console.log(index)
    let todos = this.state.todos;
    console.log("hey");
    console.log(todos);
    todos = todos.filter((todo)=>{return todo.counter!==index})
    console.log('filtered')
    console.log(todos)   
    this.setState({todos:todos}) 
  }
  constructor(){
    super();
    this.addTodo = this.addTodo.bind(this)
    this.state = {
      todos:[],
      title:'React first working App.',
      counter:0
    }
  } 
  render() {
    let title = this.state.title;
    let todos = this.state.todos;
    return (
      <div className="App">
        <h1>{title}</h1>
         <form ref = "todoForm">
          <input type="text" ref="name" placeholder="what do you want to do" />
          <input type="text" ref="completed" placeholder="Is it done yet"/>
          <button onClick={this.addTodo.bind(this)}>add Todo</button>
         </form>
         <ul>
           {console.log(todos)}
           {todos.map((todo)=><li key={todo.counter}>{todo.name}<button onClick={this.removeTodo.bind(this, todo.counter).bind(this)} style={{marginLeft:10}}>delete</button><button style={{marginLeft:10}}>edit</button></li>)}
         </ul>
      </div>
    );
  }
}

export default App;
