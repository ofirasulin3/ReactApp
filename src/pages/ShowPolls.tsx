
import React, { useState } from "react";
import Select from 'react-select';
import Chart from "./Chart.tsx";

function ShowPolls() {
    const [pollWasChosen, setPollWasChosen] = useState(0);
    const [questionWasChosen, setQuestionWasChosen] = useState(0);
    const [questions_options, set_questions_options] = useState([]);
    const [filter_poll, set_filter_poll] = useState();
    const [filter_question, set_filter_question] = useState();
    const [filter_votes, set_filter_votes] = useState([]);

    //const [poll_name, setPoll_name] = useState();
    //let filter_poll = '1';
    //let filter_question = '1';
    const { selectedOption } = '1';
    const { selectedQuestion } ='1';

    /*const options = [
      {value: '1', label: '1'},
      {value: '2', label: '2'},
      {value: '3', label: '3'},
      {value: '4', label: '4'},
    ];*/

    const handleChange = selectedOption => {
       //filter_poll = selectedOption.value;
       set_filter_poll(selectedOption.value);
    };

    const handleQuestionChange = selectedQuestion => {
       //filter_question = selectedQuestion.value;
       set_filter_question(selectedQuestion.value);
    };

    const choosePollClicked = async e => {
        console.log("send poll button clicked");
        e.preventDefault();

        //if(filter_poll==='1'){
        if(!filter_poll){
            alert("You have to select a poll.");
            return;
        } else{
            setPollWasChosen(1);
            console.log("chosen poll_name is:", filter_poll);

            fetch('http://127.0.0.1:5000/poll_questions',
                {
                    method: 'GET',
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'poll_name': filter_poll,
                    }
                }
            )
            .then((response) => response.json())
            /*.then((response) => {
                console.log("response from flask is:", response);
                //response.json();
                console.log("json response is:", response.json());
                //console.log("json response is:", response);
            })*/
             .then((data) => {
              console.log("data is:", data);

                 /*this.setState(() => {
                     const ar = res.results;
                     return {
                         admins: ar
                     }
                 })*/

                  let arr_options = [];
                  for(let i = 0; i< data.length; i++){
                      arr_options.push({value: data[i], label: data[i]});
                  }

                  /*data.map(row=>{
                    Object.keys(row).map(key=>{
                      arr_options.push({value: row[key], label: row[key]})
                    })
                  })*/
                  console.log('questions_options', arr_options);
                  set_questions_options(arr_options);
               });

        }
    }

    const showQuestionClicked = async e => {
        console.log("show question button clicked");
        e.preventDefault();

        //if(filter_question==='1'){
        if(!filter_question){
            alert("You have to select a question.");
            return;
        } else{
            setQuestionWasChosen(1);
            console.log("chosen question is:", filter_question);
        }

        fetch('http://127.0.0.1:5000/question_votes',
        {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'poll_name': filter_poll,
                'question_name': filter_question,
            }
        }
    )
    .then((response) => response.json())
     .then((data) => {
      console.log("data is:", data);

          let arr_answers = [];
          /*for(let i = 0; i< data.length; i++){
              arr_answers.push({answer: data[i].first, votes: data[i]});
          }*/
          Object.entries(data)
              .map( ([key, value]) =>  arr_answers.push({answer: key, votes : value}) );

          /*data.map(row=>{
            Object.keys(row).map(key=>{
              arr_answers.push({answer: key, votes : row[key]})
            })
          })*/
          console.log('answers:', arr_answers);
          set_filter_votes(arr_answers);

          /*this.setState({
                 answers: arr_answers
          });
          console.log('this.state.answers before:', this.state.answers);
          console.log('this.state.filled before:', this.state.filled);
          this.setState({
                 filled: 1-this.state.filled
          });
          console.log('this.state.filled after:', this.state.filled);
          console.log('this.state.answers after:', this.state.answers);
          this.setState({
                 answers: arr_answers
          });*/
       });


        /*//send a request to the route that will activate the poll and send it to users
        fetch('http://127.0.0.1:5000/show_poll',
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
                } else{
                    alert("500 Internal Server Error. Please try again.");
                }
               }).catch(error => console.log(error, error));

        //Reset all variables.
        filter_poll='1';
        filter_question='1';
        setPollWasChosen(0);
        setPollWasChosen(1);
        //setChose(0);
        //setPoll_name();
        //setChose(1-chose);*/
    }

    const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );

    class ChartComponent extends React.Component {
        render() {

            return (
                <div id="chartfatherdiv">
                   <h2 id="transparent_h2">Number of votes per answer: Number of votes per answer:</h2>
                   <Chart poll_name={filter_poll} question_name={filter_question} question_votes={filter_votes} />
                </div>
            )

        }

    }

    class ShowPollsForm extends React.Component{
        state = {
            polls_options_state: [],
        };
        //questions_options, handleQuestionChange, selectedQuestion

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
          { pollWasChosen === 0 ?
            <FormHeader title="Choose a Poll:"/>
          :
            <FormHeader title="Choose a Question:"/>
          }
          <div>
          <form onSubmit={choosePollClicked}>

             <div className="row3">

      { pollWasChosen === 0 ?
               <div>
               {
                    (this.state.polls_options_state && this.state.polls_options_state.length) ?
                        <Select id="selectt"
                            value={selectedOption}
                            onChange={handleChange}
                            options={this.state.polls_options_state}
                        />
                    :
                        <div></div>
               }
               </div>
           :
               <div>
               {
                    (questions_options && questions_options.length) ?
                        <Select id="selectt"
                            value={selectedQuestion}
                            onChange={handleQuestionChange}
                            options={questions_options}
                        />
                    :
                        <div></div>
               }
               </div>
       }

            </div>
            <div id="line2"></div>

      { pollWasChosen === 0 ?
            <div id="button" className="row">
                <div id="line"></div>
                <div id="line"></div>
                <div id="line"></div>
                <button key="key-36" type="submit">Choose This Poll ????</button>
            </div>
        :
            <div>
                    <div id="button" className="row">
                        <div id="line"></div>
                        <div id="line"></div>
                        <div id="line"></div>
                        <button key="key-26" onClick={showQuestionClicked}>Show Question Results ????</button>
                    </div>
            </div>
        }

          </form>
            </div>
          </div>
        )
      }
    }


    return (
    <div>
        <div className="row2">
            <h1>Show Results</h1>
        </div>
      { questionWasChosen === 0 ?
            <ShowPollsForm />
       :

          <ChartComponent />

      }

    </div>
    );
}


export default ShowPolls;