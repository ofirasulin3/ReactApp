// import React, { Component } from "react";
// import "./styles.css";
// import * as am5 from "@amcharts/amcharts5";
// import * as am5xy from "@amcharts/amcharts5/xy";
// import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
//
// class Charts extends Component {
//   componentDidMount() {
//     let root = am5.Root.new("chartdiv");
//
//     root.setThemes([am5themes_Animated.new(root)]);
//
//     let chart = root.container.children.push(
//       am5xy.XYChart.new(root, {
//         panY: false,
//         layout: root.verticalLayout
//       })
//     );
//
//     // Define data
//     let data = [
//       {
//         category: "Research",
//         value1: 1000,
//         value2: 10
//       },
//       {
//         category: "Marketing",
//         value1: 1200,
//         value2: 100
//       },
//       {
//         category: "Sales",
//         value1: 850,
//         value2: 1
//       }
//     ];
//
//     // Create Y-axis
//     let yAxis = chart.yAxes.push(
//       am5xy.ValueAxis.new(root, {
//         renderer: am5xy.AxisRendererY.new(root, {})
//       })
//     );
//
//     // Create X-Axis
//     let xAxis = chart.xAxes.push(
//       am5xy.CategoryAxis.new(root, {
//         renderer: am5xy.AxisRendererX.new(root, {}),
//         categoryField: "category"
//       })
//     );
//     xAxis.data.setAll(data);
//
//     // Create series
//     let series1 = chart.series.push(
//       am5xy.ColumnSeries.new(root, {
//         name: "Series",
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: "value1",
//         categoryXField: "category"
//       })
//     );
//     series1.data.setAll(data);
//
//     let series2 = chart.series.push(
//       am5xy.ColumnSeries.new(root, {
//         name: "Series",
//         xAxis: xAxis,
//         yAxis: yAxis,
//         valueYField: "value2",
//         categoryXField: "category"
//       })
//     );
//     series2.data.setAll(data);
//
//     // Add legend
//     let legend = chart.children.push(am5.Legend.new(root, {}));
//     legend.data.setAll(chart.series.values);
//
//     // Add cursor
//     chart.set("cursor", am5xy.XYCursor.new(root, {}));
//
//     this.root = root;
//   }
//
//   componentWillUnmount() {
//     if (this.root) {
//       this.root.dispose();
//     }
//   }
//
//   render() {
//     return <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>;
//   }
// }
//
// export default Charts;
//
//
//
//
//
//
//





import React, { useState } from "react";
//import '../App.css';
//import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'   /* fdsfds  */
import Select from 'react-select';

function Charts() {
    //const [user2, setUser2] = useState();
    const [filled, setFilled] = useState(0);
    const [q_list, setQ_list] = useState([]);
     const [chosen_poll, SetChosenPoll] = useState("init");
     const [polls_names, set_polls_name] = useState([]);
    //const [expectedAnswer, setExpectedAnswer] = useState('1');
    var selectedOption;


     const submitPollSelected = async e => {
        console.log("submit poll button clicked");
        e.preventDefault();
        // //check if questions is empty.
        // body: JSON.stringify(your_array)
        // //at the end:
        // setQ_list([]);
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
       SetChosenPoll(selectedOption);
       //console.log('filter_answer changed:', filter_answer);
       /*setExpectedAnswer(selectedOption.value);*/
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
                    value={selectedOption}  /* chosen value */
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
          <h1>Create New Poll</h1>
          <Charts_poll/>
        </div>
        );


}


export default Charts;