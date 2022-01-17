
import React, { useState } from "react";
//import '../App.css';
//import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Select from 'react-select';

function CreatePoll() {
    //const [user2, setUser2] = useState();
    const [filled, setFilled] = useState(0);
    const [poll_name_filled, setPoll_name_filled] = useState(0);
    const [q_list, setQ_list] = useState([]);
    //const [expectedAnswer, setExpectedAnswer] = useState('1');
    let question;
    let poll_name;

    let answer1;
    let answer2;
    let answer3;
    let answer4;
    let filter_answer = '1';
    //let questions = [];

    const addQuestionToQuestions = async(q_to_add) =>{
      var currentQuestions = q_list;
      currentQuestions.push(q_to_add);
      setQ_list(currentQuestions);
    }

    /*const addQuestionToQuestions = async (q_to_add) => {
        var currentQuestions = q_list.slice();
        currentQuestions.push(q_to_add);
        setQ_list(currentQuestions);
    }*/

    //const options = ['1', '2', '3', '4']
    const options = [
      {value: '1', label: '1'},
      {value: '2', label: '2'},
      {value: '3', label: '3'},
      {value: '4', label: '4'},
    ];
    //const defaultOption = options[0]

    const handleChange = selectedOption => {
       filter_answer = selectedOption.value;
       //console.log('filter_answer changed:', filter_answer);
       /*setExpectedAnswer(selectedOption.value);*/
    };

    const submitPollNameClicked = async e => {
        console.log("submit poll name button clicked");
        e.preventDefault();

        if(!poll_name || (poll_name && poll_name.length===0)){
            alert("You have to fill in poll name.");
            return;
        } else{
            console.log("poll_name is:", poll_name);
            setPoll_name_filled(1);
        }
    }

    // submiting the poll
    //concating the last question to the questions list
    //and sending all questions list to the db
    const submitPollClicked = async e => {
        console.log("submit poll button clicked");
        e.preventDefault();

        if(question && answer1 && answer2){
            alert("Please Submit the question before submitting poll.");
            return;
        }
        //check if questions is empty.
        if(q_list.length===0){
            alert("Please Submit at least 1 question before submitting a poll.");
            return;
        }
        //
        fetch('http://127.0.0.1:5000/newpoll',
                {
                   method: 'POST',
                   headers:
                       { 'Content-Type':'application/json',
                          'poll_name': poll_name,
                           'body': JSON.stringify(q_list})
                       },
                }
            ).then((response) => {
                console.log("response from flask for add_admin is:", response);
                console.log("response.status is:", response.status);
                if(response.status==="200"){
                    alert("Poll was added successfully");
                    console.log("Poll Questions are:\n", questions);

                    //reset all variables.
                    question = "";
                    answer1 = "";
                    answer2 = "";
                    answer3 = "";
                    answer4 = "";
                    filter_answer = '1';

                } else if(response.status==="409"){
                    alert("Invalid poll arguments.");
                } else{
                    alert("500 Internal Server Error. Please try again.");
                }
               }).catch(error => console.log(error, error));

        //Reset questions list at the end:
        setQ_list([]);
    }

    //concating a question to the questions list
    const nextQuestionClicked = async e => {
        console.log("next question button clicked");
        e.preventDefault();

        if(answer1 && answer2 && question){
            if((answer1 && answer1.length===0) || (answer2 && answer2.length===0)){
               alert("You have to fill in answers 1 and 2");
               return;
            }
            if((answer4 && !answer3) || (answer4 && answer3 && answer3.length===0 && answer4.length>0)){
               alert("You have to fill in answer 3 before answer 4");
               return;
            }

            console.log("current question is: ", question)

            let q_singleton =
            [{'question':question,
             'answer1':answer1,
             'answer2':answer2,
             'answer3':answer3,
             'answer4':answer4,
             'filter_answer':filter_answer}];

            console.log("Question: ", question, "added successfully!\n"
                           + " answer1: ", answer1, "\n"
                           + " answer2: ", answer2, "\n"
                           + " answer3: ", answer3, "\n"
                           + " answer4: ", answer4, "\n"
                           + " filter_answer: ", filter_answer, "\n");

            //reset all variables.
            question = "";
            answer1 = "";
            answer2 = "";
            answer3 = "";
            answer4 = "";
            filter_answer = '1';
            console.log("q_singleton:", q_singleton)
            console.log("Questions before concat:", q_list)
            //questions = questions.concat(q_singleton);
            //setQ_list(q_list.concat(q_singleton));
            addQuestionToQuestions(q_singleton)
            //setQ_list([...q_list, ...q_singleton]);
            //questions = [...questions, ...q_singleton]
            console.log("Questions after concat:", q_list)
            console.log("Questions size after concat:", q_list.length)
            setFilled(1-filled);

        }
        else{
            alert("Please fill in all mandatory fields");
            return;
        }
    };

    /*const FormHeader = props => (
        <h2 id="headerTitle">{props.title}</h2>
    );*/

    class CreatePollForm extends React.Component{
      render(){
        const { selectedOption } = filter_answer;

        return(
          <div id="loginform">
          {/*<FormHeader title="Create New Poll"/>*/}
          <div>
          <form onSubmit={submitPollClicked}>
            { poll_name_filled===1 ? <div></div> : <div className="row3">
                <label htmlFor="PollName">Poll Name</label>
                <input id="PollName"
                    key="key-10"
                    value={poll_name}
                    type="text"
                    placeholder="Enter the poll name"
                    onChange={({ target }) => {poll_name = target.value}}
                />
            </div> }

            { poll_name_filled===0 ? <div></div> : <div className="row3">
                <label htmlFor="Question">Question</label>
                <input id="Question"
                    key="key-0"
                    value={question}
                    type="text"
                    placeholder="Enter the question"
                    onChange={({ target }) => {question = target.value}}
                />
            </div> }

            { poll_name_filled===0 ? <div></div> : <div className="row3">
                <label htmlFor="Answer1">Answer 1</label>
                <input id="Answer1"
                    key="key-1"
                    value={answer1}
                    type="text"
                    placeholder="1st answer"
                    onChange={({ target }) => {answer1 = target.value}}
                />
            </div> }

            { poll_name_filled===0 ? <div></div> : <div className="row3">
                <label htmlFor="Answer2">Answer 2</label>
                <input id="Answer2"
                    key="key-2"
                    value={answer2}
                    type="text"
                    placeholder="2nd answer"
                    onChange={({ target }) => {answer2 = target.value}}
                />
            </div> }

            { poll_name_filled===0 ? <div></div> : <div className="row3">
                <label htmlFor="Answer3">Answer 3</label>
                <input id="Answer3"
                    key="key-3"
                    value={answer3}
                    type="text"
                    placeholder="3rd answer (optional)"
                    onChange={({ target }) => {answer3 = target.value}}
                />
            </div> }

            { poll_name_filled===0 ? <div></div> : <div className="row3">
                <label htmlFor="Answer4">Answer 4</label>
                <input id="Answer4"
                    key="key-4"
                    value={answer4}
                    type="text"
                    placeholder="4th answer (optional)"
                    onChange={({ target }) => {answer4 = target.value}}
                />
                <div id="line"></div>

                <div id="line2">Number of filtering answer:</div>

                <Select id="selectt"
                    value={selectedOption}
                    defaultValue={{value: '1', label: '1'}}
                    onChange={handleChange}
                    options={options}
                />

            </div> }

            { poll_name_filled===0 ? <div id="button" className="row">

                <button key="key-5" onClick={submitPollNameClicked}>Submit Poll Name 📛️</button>
                <div id="line"></div>
            </div>
            :
            <div id="button" className="row">
                <div id="line"></div>
                <div id="line"></div>

                <button key="key-5" onClick={nextQuestionClicked}>Submit Question ⏭️</button>
                <div id="line"></div>
                {q_list.length===0 ? <div></div> :
                <button key="key-6" type="submit" >Submit Poll 📊</button> }
            </div> }

          </form>
            </div>
          </div>
        )
      }
    }

    /*if(username2 && username2!==""){
    console.log("username2 is not null: ", username2);
        return (
        <div className="row2">
          <h1>Create New Poll</h1>

        </div>
        );
    }
    else{*/
        return (
        <div className="row2">
          <h1>Create New Poll</h1>
          <CreatePollForm />
        </div>
        );
    //}
}


export default CreatePoll;