import React, { Component } from 'react';
import { BrowserRouter as Router,Link,NavLink,Redirect,Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route';
import './App.css';

const User = (params) => {
    return(<h1> Welcome User {params.username}</h1>);
  }

class App extends Component {
  state = {
    loggedIn: false
  }
  loginHandle=()=>{
    console.log("ok");
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }))
  }
  render() {
    return (
      <Router>
        <div className="App">
          <ul>
            <li>
              <NavLink to="/home" activeStyle={{color:'red'}}> Home </NavLink>
            </li>
            <li>
              <NavLink to="/about" activeStyle={{color:'red'}}> About </NavLink>
            </li>
            <li>
              <NavLink to="/user/john" activeStyle={{color:'red'}}> User John </NavLink>
            </li>
            <li>
              <NavLink to="/user/peter" activeStyle={{color:'red'}}> User Peter </NavLink>
            </li>
          </ul>
          
          <Prompt
            when={!this.state.loggedIn}
            message={(location)=>{
              return location.pathname.startsWith('/user')? 'Are you sure' : true ;
            }}
            >
          </Prompt>

          <input type="button" value={this.state.loggedIn ? 'Log Out' : 'Log In'} onClick={this.loginHandle.bind(this)}/>
          <Route path="/home" exact render ={
            () => {
              return(<h1>Welcome Home</h1>);
            }
          }/>

          <Route path="/about" exact strict render ={
            () => {
              return(<h1>Welcome About</h1>);
            }
          }/>

          <Route path="/user/:username" exact strict render ={({match}) => (
            this.state.loggedIn ? (<User username={match.params.username}/>) : (<Redirect to="/" />)
            )}

           />

        </div> 
      </Router>
    );
  }
}

export default App;
