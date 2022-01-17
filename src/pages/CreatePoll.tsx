
import React, { useState } from "react";
//import '../App.css';
//import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Select from 'react-select';

function CreatePoll() {
    //const [user2, setUser2] = useState();
    const [filled, setFilled] = useState(0);
    //const [expectedAnswer, setExpectedAnswer] = useState('1');
    let question;
    let answer1;
    let answer2;
    let answer3;
    let answer4;
    let filter_answer = '1';
    let questions = [];

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

    // submiting the poll
    //concating the last question to the questions list
    //and sending all questions list to the db
    const submitPollClicked = async e => {
        console.log("submit poll button clicked");
        e.preventDefault();
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

            questions = questions.concat(q_singleton);
            console.log("current questions list is: ", questions)

            /*{'question2': question2,
              'answer1':answer1, 'answer2':answer2,
              'answer3':answer3, 'answer4':answer4,
              'filter_answer':filter_answer}];*/

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
                    setFilled(1-filled);
            /*fetch('http://127.0.0.1:5000/add_admin',
                {
                  'methods':'GET',
                   'headers' : {
                    'username':username2,
                    'password':password2,
                    'Content-Type':'application/json'
                   }
                }
            ).then((response) => {
                console.log("response from flask for add_admin is:", response);
                console.log("response.status is:", response.status);
                if(response.status==="200"){
                    console.log("username and password are valid");
                    alert("Question: ", question, "added successfully!\n"
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

                } else if(response.status==="409"){
                    alert("Admin username already exists.");
                } else{
                    alert("500 Internal Server Error. Please try again.");
                }
               }).catch(error => console.log(error, error));*/
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
          <form onSubmit={nextQuestionClicked}>
            <div className="row">
                <label htmlFor="Question">Question</label>
                <input id="Question"
                    key="key-0"
                    value={question}
                    type="text"
                    placeholder="Enter the question"
                    onChange={({ target }) => {question = target.value}}
                />
            </div>

            <div className="row">
                <label htmlFor="Answer1">Answer 1</label>
                <input id="Answer1"
                    key="key-1"
                    value={answer1}
                    type="text"
                    placeholder="1st answer"
                    onChange={({ target }) => {answer1 = target.value}}
                />
            </div>

            <div className="row">
                <label htmlFor="Answer2">Answer 2</label>
                <input id="Answer2"
                    key="key-2"
                    value={answer2}
                    type="text"
                    placeholder="2nd answer"
                    onChange={({ target }) => {answer2 = target.value}}
                />
            </div>

            <div className="row">
                <label htmlFor="Answer3">Answer 3</label>
                <input id="Answer3"
                    key="key-3"
                    value={answer3}
                    type="text"
                    placeholder="3rd answer (optional)"
                    onChange={({ target }) => {answer3 = target.value}}
                />
            </div>

            <div className="row">
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
               {/*<div><select id = "dropdown" ref = {(input)=> this.menu = input}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
               </select></div>*/}
               {/*<Dropdown options={options} onChange={this._onSelect; console.log("this._onSelect is:", this._onSelect)} value={defaultOption} placeholder="Select answer number filter:" />*/}
               {/*<Dropdown options={options} onChange={({ target }) => {filter_answer = target.value; console.log("filter_answer is:", filter_answer)}} value={defaultOption} placeholder="Select answer number filter:" />*/}
            </div>

            <div id="button" className="row">
                <div id="line"></div>
                <div id="line"></div>

                <button key="key-5" type="submit">Next Question ⏭️</button>
                <div id="line"></div>
                <button key="key-6">Submit Poll 📊</button>
            </div>

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