import React, { useState } from 'react';
//import ReactDOM from 'react-dom';
import logo from './logo.png';
import './App.css';
import axios from 'axios';


import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import About from "./pages/About.tsx";
import Login from "./pages/Login.tsx";
import Home, { Banner } from "./pages/Home.tsx";

/*const App = props => (
<div>
    <img src={logo} className="App-logo" alt="logo" />
    <LoginForm  />
</div>
);*/

function App() {
    const [login, setLogin] = React.useState(0);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState();

    // logout the user
    const handleLogout = () => {
      setUser({});
      setUsername("");
      setPassword("");
      //localStorage.clear();
    };

    // login the user
    const handleSubmit = async e => {
        e.preventDefault();
        //const user = { username, password };
        // send the username and password to the server
        /*const response = await axios.post(
          "http://blogservice.herokuapp.com/api/login",
          user
        );
        // set the state of the user
        setUser(response.data);*/
        setUser("David")
        // store the user in localStorage
        //localStorage.setItem("user", JSON.stringify(response.data));
    };


    class LoginForm extends React.Component{
      render(){

        /*return(
          <div>
            <FormHeader title="Loggedin!!" />
          </div>
        )*/

        return(
          <div id="loginform">
            <FormHeader title="Admin Login" />
            <Form />
          </div>
        )

      }
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    const Form = props => (
       <div>
         <FormInput description="Username" placeholder="Enter your username" type="text" />
         <FormInput description="Password" placeholder="Enter your password" type="password"/>
         <FormButton title="Log in"/>
       </div>
    );
    const loginClicked = () => {
        console.log("login clickeddddd");
        //setLogin(count+1);
        console.log(login);
        //this.logged_in = 1;
    }



    /*document.getElementById("btnLogin")
        .addEventListener("click", loginClicked);*/

    const FormInput = props => (
      <div className="row">
        <label >{props.description}</label>
        <input type={props.type} placeholder={props.placeholder}/>
      </div>
    );

    const FormButton = () => (
      <div id="button" className="row">
        <button onClick={handleSubmit}>Log in</button>
      </div>
    );

    // if there's a user show the message below
    if (user) {
        return (
          <div>
            {user} is logged in
            <button onClick={handleLogout}>logout</button>
          </div>
        );
    }

    return (
    <div>
        <Router>
          <div>
          {user ? <Link to="/">Home</Link> :
             <Link to="/">Login</Link>}

            <Link to="/about">About</Link>
          </div>

          <Routes>
             {user ? <Route path='/' exact element={<Home/>} /> :
             <Route path='/' exact element={<Login/>} />}


            <Route path='/about' exact element={<About/>}/>
          </Routes>
        </Router>

        <img src={logo} className="App-logo" alt="logo" />
        <LoginForm />
    </div>
    )
}



/*ReactDOM.render(
    <App />,
    document.getElementById('container')
);*/

export default App;