import logo from './logo.svg';
import './App.css';

import React from 'react';
import ReactDOM from 'react-dom';

const App = props => (
    <LoginForm />
);


class LoginForm extends React.Component{
  render(){
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

const FormButton = props => (
  <div id="button" class="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div class="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder}/>
  </div>
);

//const OtherMethods = props => (
//  <div id="alternativeLogin">
//    <label>Or sign in with:</label>
//    <div id="iconGroup">
//      <Facebook />
//      <Twitter />
//      <Google />
//    </div>
//  </div>
//);


ReactDOM.render(<App />, document.getElementById('container'));

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