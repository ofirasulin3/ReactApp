import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import logo from './logo.png';
import './App.css';
//import axios from 'axios';

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";

function App() {
    const [user, setUser] = useState();
    //const [username, setUsername] = useState("");
    //const [password, setPassword] = useState("");
    let username;
    let password;
    // logout the user
    const logoutClicked = () => {
      console.log("logout button clicked");
      setUser({});
      //setUsername("");
      //setPassword("");
      //localStorage.clear();
    };

    // login the user
    const loginClicked = async e => {
    e.preventDefault();
        if(username && password)
        {
            console.log("login button clicked");
            console.log("username: ", username)
            setUser(username);
        }
        else{
            alert("Please fill all of the fields");
        }
        //const user = { username, password };
        // send the username and password to the server
        /*const response = await axios.post(
          "http://blogservice.herokuapp.com/api/login",
          user
        );
        // set the state of the user
        setUser(response.data);*/
        //setUser("David")
        //setUser(username)
        // store the user in localStorage
        //localStorage.setItem("user", JSON.stringify(response.data));
    };

    class LoginForm extends React.Component{
      render(){
        return(
          <div id="loginform">
            <FormHeader title="Admin Login" />
            <div>
          <form onSubmit={loginClicked}>
            <div className="row">
                <label htmlFor="Username">Username</label>
                <input id="Username"
                    key="key1"
                    value={username}
                    type="text"
                    placeholder="Enter your username"
                    onChange={({ target }) => {username = target.value}}
                />
            </div>

            <div className="row">
                <label htmlFor="Password">Password</label>
                <input id="Password"
                    key="key2"
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                    onChange={({ target }) => {password = target.value}}
                />
            </div>
            <div id="button" className="row">
                <button key="key3" type="submit">Login</button>
            </div>
          </form>
        </div>
          </div>
        )
      }
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    const Form = props => (
        <div>
          <form onSubmit={loginClicked}>
            <div className="row">
                <label>Username</label>
                <input id="Username"
                    key="key1"
                    value={username}
                    type="text"
                    placeholder="Enter your username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>

            <div className="row">
                <label>Password</label>
                <input id="Password"
                    key="key2"
                    value={password}
                    type="password"
                    placeholder="Enter your password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <div id="button" className="row">
                <button key="key3" type="submit">Login</button>
            </div>
          </form>
        </div>
    );

    /*const Form = props => (
       <div>
         <UsernameInput description="Username" placeholder="Enter your username" type="text" />
         <PasswordInput description="Password" placeholder="Enter your password" type="password"/>
         <FormButton title="Log in"/>
       </div>
    );*/

    const UsernameInput = props => (
      <div className="row">
        <label>{props.description}</label>
        <input id="Username" key="random1" value={username} onChange={({ target }) => setUsername(target.value)} type={props.type} placeholder={props.placeholder}/>
      </div>
    );

    const PasswordInput = props => (
      <div className="row">
        <label>{props.description}</label>
        <input id="Password" key="random2" value={password} onChange={({ target }) => setPassword(target.value)} type={props.type} placeholder={props.placeholder}/>
      </div>
    );

    const FormButton = props => (
      <div id="button" className="row">
        <button key="loginBtn" onClick={loginClicked}>{props.title}</button>
      </div>
    );

    // if there's a user show the message below
    if (user) {
    console.log("username is not null.");
        return (
    <div className="row">
        <img id="logo_img" src={logo} className="App-logo" alt="logo" />
        <p> </p>
        <p>Welcome back {user}!</p>

        <Router>
            <div>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </div>

            <Routes>
                <Route path='/' exact element={<Home/>} />
                <Route path='/about' exact element={<About/>}/>
            </Routes>
        </Router>
        <button onClick={logoutClicked}>logout</button>

    </div>
        );
    }

    return (

<div className="row">
    <img id="logo_img" src={logo} className="App-logo" alt="logo" />
    <p> </p>
    <Router>
        <div>
            <Link to="/">Login</Link>
            <Link to="/about">About</Link>
        </div>

        <Routes>
            <Route path='/' exact element={<Login/>} />
            <Route path='/about' exact element={<About/>}/>
        </Routes>
    </Router>

    <LoginForm />

</div>
    )
}



/*ReactDOM.render(
    <App />,
    document.getElementById('container')
);*/

export default App;