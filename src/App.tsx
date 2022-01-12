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
      setUser("");
      //setUsername("");
      //setPassword("");
      //localStorage.clear();
    };

    // login the user
    const loginClicked = async e => {
    e.preventDefault();
        if(username && password)
        {
            if(username.length<=4){
                alert("Username should be at least 5 characters long.");
               return;
            }
            if(! ( (username[0]>='a'&&username[0]<='z') || (username[0]>='A'&&username[0]<='Z') )){
               alert("Username should start with a letter.");
               return;
            }
            if(password.length<=5){
                alert("Password should be at least 6 characters long.");
               return;
            }
            console.log("login button clicked");
            console.log("username: ", username)
            setUser(username);
        }
        else{
            alert("Please fill in all of the fields");
            return;
        }
        //const user = { username, password };
        // send the username and password to the server
        /*const response = await axios.post(
          "http://blogservice.herokuapp.com/api/login",
          user
        );
        // set the state of the user
        setUser(response.data);*/
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



    // if there's a user show the message below
    if (user) {
    console.log("username is not null.");
        return (
    <div>
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


    </div>
    <div className="short_row">
        <button id="logoutBtn" onClick={logoutClicked}>logout</button>
    </div>
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