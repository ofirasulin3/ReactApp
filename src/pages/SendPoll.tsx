
import React, { useState } from "react";
import Select from 'react-select';

function SendPoll() {
    //const [chose, setChose] = useState(0);
    //const [poll_name, setPoll_name] = useState();
    let filter_poll = '1';
    const { selectedOption } = filter_poll;

    /*const options = [
      {value: '1', label: '1'},
      {value: '2', label: '2'},
      {value: '3', label: '3'},
      {value: '4', label: '4'},
    ];*/

    const handleChange = selectedOption => {
       filter_poll = selectedOption.value;
    };

    const sendPollClicked = async e => {
        console.log("send poll button clicked");
        e.preventDefault();

        //if(!poll_name || (poll_name && poll_name.length===0)){
        if(filter_poll==='1'){
            alert("You have to select a poll.");
            return;
        } else{
            console.log("chosen poll_name is:", filter_poll);
            //setChose(1);
        }
        //alert("Poll was successfully sent to users!");

        //send a request to the route that will activate the poll and send it to users
        fetch('http://127.0.0.1:5000/activate_poll',
                {
                   method: 'GET',
                   headers:
                       { 'Content-Type':'application/json',
                          'poll_name': filter_poll,
                       },
                }
            ).then((response) => {
                console.log("response from flask for add_admin is:", response);
                console.log("response.status is:", response.status);
                if(response.status===200){
                    alert("Poll was successfully sent to users!");
                    console.log("Poll Questions are:\n", questions);

                    //reset all variables.
                    filter_poll = '1';

                } else{
                    alert("500 Internal Server Error. Please try again.");
                }
               }).catch(error => console.log(error, error));

        //Reset all variables.
        filter_poll='1';
        //setChose(0);
        //setPoll_name();
        //setChose(1-chose);
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    class SendPollForm extends React.Component{
        state = {
            polls_options_state: []
        };

        componentDidMount() {
         /*fetch('https://swapi.dev/api/people/').then(data => data.json()).then(res => {
             this.setState(() => {
                 const ar = res.results;
                 return {
                     admins: ar
                 }
             })
         })*/
          fetch('http://127.0.0.1:5000/get_pools',
            {
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((response) => response.json())
              .then((data) => {
                 /*this.setState(() => {
                     const ar = res.results;
                     return {
                         admins: ar
                     }
                 })*/

                  let arr_options = [];
                  //let arr_names = [];
                  data.map(row=>{
                    Object.keys(row).map(key=>{
                      //arr_names.push({key,value:row[key]})
                      arr_options.push({value: row[key], label: row[key]})
                    })
                  })
                  this.setState({ polls_options_state: arr_options });
                  console.log('polls_options_state', this.state.polls_options_state)
                  //set_polls_options(arr_options);
               });

        }



      render(){

        return(
          <div id="loginform">
          <FormHeader title="Choose a Poll:"/>
          <div>
          <form onSubmit={sendPollClicked}>

             <div className="row3">
               { (this.state.polls_options_state && this.state.polls_options_state.length) ?
                <Select id="selectt"
                    value={selectedOption}
                    //defaultValue={this.state.polls_options_state[0]}
                    onChange={handleChange}
                    options={this.state.polls_options_state}
                />
                : <div></div> }

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