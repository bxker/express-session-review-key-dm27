import React from 'react';
import './App.css';
import Axios from 'axios'

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      user: {},
      username: '',
      password: ''
    }
  }

  // componentDidMount(){
  //   Axios.get('/auth/user').then(response => {
  //     this.setState({
  //       user: response.data
  //     })
  //   })
  // }

  handleInputChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  login = () => {
    Axios.post('/auth/login', {username: this.state.username, password: this.state.password}).then(response => {
      this.setState({
        user: response.data
      })
    })
  }
  
  render(){
    console.log(this.state.user)
    return (
      <div className="App">
        <input onChange={this.handleInputChange} name="username" placeholder="username"></input>
        <input onChange={this.handleInputChange} name="password" placeholder="password"></input>
        <button onClick={this.login}>Login</button>
    {this.state.user.username ? <h1>Welcome, {this.state.user.username}</h1>: null}
      </div>
    );
  }
}

export default App;
