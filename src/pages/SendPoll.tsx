
import React, { useState } from "react";
//import 'react-dropdown/style.css'
import Select from 'react-select';

function SendPoll() {
    const [chose, setChose] = useState(0);
    const [poll_name, setPoll_name] = useState();
    let filter_poll = '1';

    const options = [
      {value: '1', label: '1'},
      {value: '2', label: '2'},
      {value: '3', label: '3'},
      {value: '4', label: '4'},
    ];

    const handleChange = selectedOption => {
       filter_poll = selectedOption.value;
    };

    const sendPollClicked = async e => {
        console.log("send poll button clicked");
        e.preventDefault();

        if(!poll_name || (poll_name && poll_name.length===0)){
            alert("You have to select a poll.");
            return;
        }
        else{
            console.log("poll_name is:", poll_name);
            setChose(1);
        }
        alert("Poll was successfully sent to users!");

        //send a request to the route that will cause to send the poll
        fetch('http://127.0.0.1:5000/newpoll',
                {
                   method: 'GET',
                   headers:
                       { 'Content-Type':'application/json',
                          'poll_name': poll_name,
                          'body': JSON.stringify(q_list)
                       },
                }
            ).then((response) => {
                console.log("response from flask for add_admin is:", response);
                console.log("response.status is:", response.status);
                if(response.status==="200"){
                    alert("Poll was successfully sent to users!");
                    console.log("Poll Questions are:\n", questions);

                    //reset all variables.
                    question = "";
                    answer1 = "";
                    answer2 = "";
                    answer3 = "";
                    answer4 = "";
                    filter_poll = '1';

                } else if(response.status==="409"){
                    alert("Invalid poll arguments.");
                } else{
                    alert("500 Internal Server Error. Please try again.");
                }
               }).catch(error => console.log(error, error));

        //Reset all variables.
        setQ_list([]);
        setChose(0);
        setPoll_name();
        //setChose(1-chose);
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    class SendPollForm extends React.Component{
      render(){
        const { selectedOption } = filter_poll;

        return(
          <div id="loginform">
          <FormHeader title="Choose a Poll:"/>
          <div>
          <form onSubmit={sendPollClicked}>
           <div className="row3">
                <Select id="selectt"
                    value={selectedOption}
                    /*defaultValue={{value: '1', label: '1'}}*/
                    onChange={handleChange}
                    options={options}
                />

            </div>
            <div id="line2"></div>

            <div id="button" className="row">
                <div id="line"></div>
                <div id="line"></div>
                <div id="line"></div>
                <button key="key-6" type="submit" >Send Poll! 📤</button>
            </div>

          </form>
            </div>
          </div>
        )
      }
    }

    return (
    <div className="row2">
      <h1>Send Poll</h1>
      <SendPollForm />
    </div>
    );
}


export default SendPoll;