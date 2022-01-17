
import React from "react";
import '../App.css';
//import user2 from '../App.css';

function AddAdmin(props) {
    //const [user2, setUser2] = useState();
    //const [filled, setFilled] = useState();
    let username2;
    let password2;

    // sign up the admin
    const signUpClicked = async e => {
        console.log("sign up button clicked");
        e.preventDefault();
        if(username2 && password2){
            if(username2.length<=4){
                alert("Username should be at least 5 characters long.");
               return;
            }
            for(let i = 0; i < username2.length; i++){
                if( !( (username2[i]>='a'&&username2[i]<='z') || (username2[i]>='A'&&username2[i]<='Z') )
                    && !(username2[i]>='0'&&username2[i]<='9') ){
                   alert("Username should contain only english letters or numbers.");
                   return;
                }
            }
            if(! ( (username2[0]>='a'&&username2[0]<='z') || (username2[0]>='A'&&username2[0]<='Z') )){
               alert("Username should start with a letter.");
               return;
            }
            if(password2.length<=5){
                alert("Password should be at least 6 characters long.");
               return;
            }
            console.log("username2:", username2);
            //props.setNewAdmin(username2);
            //setUser2(username2);
            //console.log("props.newAdmin is:", props.newAdmin);
            //inserting to db

            //setFilled("");
            //props.setNewAdmin("");
            fetch('http://127.0.0.1:5000/add_admin',
                {
                  'methods':'GET',
                   'headers' : {
                    'username':username2,
                    'password':password2,
                    'Content-Type':'application/json'
                   }
                }
           //).then(response => response.json())
           //.then(response => JSON.parse(JSON.stringify(response)))
            ).then((response) => {
                console.log("response from flask for add_admin is:", response);
                console.log("response.status is:", response.status);
                if(response.status===200){
                    console.log("username and password are valid");
                    //setUser(username);
                    alert("Admin " + username2 + " added successfully!");
                    username2 = "";
                    password2 = "";
                } else if(response.status===409){
                    alert("Admin username already exists.");
                } else{
                    alert("500 Internal Server Error. Please try again.");
                }
                //setAuthenticated(response);
               }).catch(error => console.log(error, error));
        }
        else{
            alert("Please fill in all of the fields");
            return;
        }
    };

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    class SignUpForm extends React.Component{
      render(){
        return(
          <div id="loginform">
            <FormHeader title="New Admin Credentials"/>
          <div>
          <form onSubmit={signUpClicked}>
            <div className="row">
                <label htmlFor="Username2">Username</label>
                <input id="Username2"
                    key="key4"
                    value={username2}
                    type="text"
                    placeholder="Enter your username"
                    onChange={({ target }) => {username2 = target.value}}
                />
            </div>

            <div className="row">
                <label htmlFor="Password2">Password</label>
                <input id="Password2"
                    key="key5"
                    value={password2}
                    type="password"
                    placeholder="Enter your password"
                    onChange={({ target }) => {password2 = target.value}}
                />
            </div>
            <div id="button" className="row">
                <button key="key6" type="submit">Sign Up Admin ✍️</button>
            </div>
          </form>
        </div>
          </div>
        )
      }
    }

    //if(props.newAdmin){
    //    console.log("props.newAdmin is not null: ", props.newAdmin);
    if(username2 && username2!==""){
    console.log("username2 is not null: ", username2);
        return (
        <div className="row2">
          <h1>Add Admin</h1>

      <p className="about">Admin {username2} added successfully!</p>

      {/*<p className="about">Admin {props.newAdmin} added successfully!</p>*/}

        </div>
        );
    }
    else{
        //console.log("props.newAdmin is null");
        return (
        <div className="row2">
          <h1>Add Admin</h1>

          <SignUpForm />

        </div>
        );
    }
}

/*const AddAdmin2 = () => {
  return (
    <div className="row2">
      <h1>Add Admin</h1>

      <SignUpForm />

    </div>
  );
};*/

export default AddAdmin;