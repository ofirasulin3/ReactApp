 import React, { useState } from "react";
 import { useEffect } from "react";
 import { Component } from "react";
 import * as am5 from "@amcharts/amcharts5";
 import * as am5xy from "@amcharts/amcharts5/xy";
 import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

 class Chart extends Component <{}, { answers: any[], filled: any }> {

    constructor(props) {
        super(props);

        this.state = {
            answers: [],
            filled: 0,
        };
        //this.handleStatusChange = this.handleStatusChange.bind(this);
      }
        //const [answers, setAnswers] = useState([]);


 //function Chart(props) {
   componentDidMount() {

   /*const chart_div = () => {
       return (
            <div id="chartdiv" style={{ width: "100%", height: "440px" }}></div>
         );
   }*/

   //useEffect(() => {
    let poll_name = this.props.poll_name;
    let question_name = this.props.question_name;
    let question_votes = this.props.question_votes;

    /*fetch(url)
     .then(resp => resp.json())
     .then(data => this.setState());*/

    console.log("poll_name to fetch is:", poll_name);
    console.log("question_name to fetch is:", question_name);
    console.log("question_votes to fetch is:", question_votes);

    /*fetch('http://127.0.0.1:5000/question_votes',
        {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'poll_name': poll_name,
                'question_name': question_name,
            }
        }
    )*/
    /*.then((response) => response.json())
     .then((data) => {
      console.log("data is:", data);
          let arr_answers = [];
          Object.entries(data)
              .map( ([key, value]) =>  arr_answers.push({answer: key, votes : value}) );

          console.log('answers:', arr_answers);
          //setAnswers(arr_answers);

          this.setState({
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
          });
       });*/

     let root = am5.Root.new("chartdiv");

     root.setThemes([am5themes_Animated.new(root)]);

     let chart = root.container.children.push(
       am5xy.XYChart.new(root, {
         panY: false,
         layout: root.verticalLayout
       })
     );

     //Define data
     let data2 = [
       {
         answer: "answer1",//answer 1
         votes: 3000
       },
       {
         answer: "answer2",//answer 2
         votes: 1200
       },
       {
         answer: "answer3", //answer 3 optional
         votes: 850
       },
       {
         answer: "answer4", //answer 4 optional
         votes: 850
       }
     ];
     console.log("data2: ", data2);

     console.log("this.state.answers: (inside root)", this.state.answers);

     // Create Y-axis
     let yAxis = chart.yAxes.push(
       am5xy.ValueAxis.new(root, {
         renderer: am5xy.AxisRendererY.new(root, {})
       })
     );

     // Create X-Axis
     let xAxis = chart.xAxes.push(
       am5xy.CategoryAxis.new(root, {
         renderer: am5xy.AxisRendererX.new(root, {}),
         categoryField: "answer"
       })
     );
     xAxis.data.setAll(question_votes);

     //xAxis.data.setAll(data2);

     // Create series
     let series1 = chart.series.push(
       am5xy.ColumnSeries.new(root, {
         name: question_name,
         xAxis: xAxis,
         yAxis: yAxis,
         valueYField: "votes",
         categoryXField: "answer"
       })
     );
     series1.data.setAll(question_votes);
     //series1.data.setAll(data2);

     /*let series2 = chart.series.push(
       am5xy.ColumnSeries.new(root, {
         name: "Series",
         xAxis: xAxis,
         yAxis: yAxis,
         valueYField: "value2",
         categoryXField: "category"
       })
     );
     series2.data.setAll(data);*/

     // Add legend
     let legend = chart.children.push(am5.Legend.new(root, {}));
     legend.data.setAll(chart.series.values);

     // Add cursor
     chart.set("cursor", am5xy.XYCursor.new(root, {}));

     this.root = root;
   }



   componentWillUnmount() {
     if (this.root) {
       this.root.dispose();
     }
   }

   render() {

     //<div id="chartdiv" style={{ width: "60%", height: "450px" }}></div>
        return (
            <div id="chartdiv" style={{ width: "100%", height: "440px" }}></div>
         );
   }


 }

 export default Chart;






/*import React, { useState } from "react";
import 'react-dropdown/style.css'
import Select from 'react-select';

function Charts() {
    const [filled, setFilled] = useState(0);
    const [q_list, setQ_list] = useState([]);
     const [chosen_poll, SetChosenPoll] = useState("init");
     const [polls_names, set_polls_name] = useState([]);
    var selectedOption;


     const submitPollSelected = async e => {
        console.log("submit poll button clicked");
        e.preventDefault();
        // //check if questions is empty.
        // body: JSON.stringify(your_array)
        // //at the end:
     }

    //const addQuestionToQuestions = async (q_to_add) => {
    //    var currentQuestions = q_list.slice();
    //    currentQuestions.push(q_to_add);
    //    setQ_list(currentQuestions);
    //}

    //const options = ['1', '2', '3', '4']
    const options = [
      {value: '1', label: '1'},
      {value: '2', label: '2'},
      {value: '3', label: '3'},
      {value: '4', label: '4'},
    ];

    //const defaultOption = options[0]

    const handleChange = selectedOption => {
       SetChosenPoll(selectedOption);
       //console.log('filter_answer changed:', filter_answer);
       //setExpectedAnswer(selectedOption.value);
    };

    // submiting the poll
    //concating the last question to the questions list
    //and sending all questions list to the db
    const submitPollClicked = async e => {
        console.log("submit poll button clicked");
        e.preventDefault();

        setQ_list([]);
    }

    class Charts_poll extends React.Component{
        state = {
           polls: []
        };

        componentDidMount() {
        // fetch('https://swapi.dev/api/people/').then(data => data.json()).then(res => {
        //     this.setState(() => {
        //         const ar = res.results;
        //         return {
        //             admins: ar
        //         }
        //     })
        // })
          fetch('http://127.0.0.1:5000/get_pools',
            {
                'headers': {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then((response) => response.json()).then((data) =>
              {
                  let mydata = [];
                  data.map(row=>{
                    Object.keys(row).map(key=>{
                      mydata.push({key,value:row[key]})
                    })
                  })

                  set_polls_name(mydata);
                  console.log('polls_name', polls_names)
               });

        }
      render(){
         // const { selectedOption } = chosen_poll;

        return(

          <form onSubmit={submitPollClicked}>
            <div className="row">
            <div id="line2">Select Poll:
            <Select id="selectt"
                    value={selectedOption}
                    // defaultValue={{value: '1', label: '1'}}
                    onChange={handleChange}
                    options={polls_names}
                />
            </div>
            </div>
          </form>

        )}}
     return (
        <div className="row2">
          <h1>Show Polls Charts</h1>
          <Charts_poll/>
        </div>
        );

}


export default Charts;*/