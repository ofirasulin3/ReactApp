import logo from './logo.png';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';


const App = props => (
<div>
    <p style="text-align:center;"><img src={logo} className="App-logo" alt="logo" /></p>
    <LoginForm />
</div>
);


class LoginForm extends React.Component{
//  const [title, setTitle] = React.useState<string>("Title");

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
    //this.logged_in = 1;
}

const FormButton = props => (
  <div id="button" class="row">
    <button onClick={loginClicked}>{props.title}</button>
  </div>
);

/*document.getElementById("btnLogin")
    .addEventListener("click", loginClicked);*/

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>
);

ReactDOM.render(
    <App />,
    document.getElementById('container')
);

export default App;


//function App() {
//  return (
//    <div className="App">
//      <header className="App-header">
//        <img src={logo} className="App-logo" alt="logo" />
//        <p>
//          Edit <code>src/App.js</code> and save to reload OFIR!!!.
//        </p>
//        <a
//          className="App-link"
//          href="https://reactjs.org"
//          target="_blank"
//          rel="noopener noreferrer"
//        >
//          Learn React
//        </a>
//      </header>
//    </div>
//  );
//}
//