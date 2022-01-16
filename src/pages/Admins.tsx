
import React from "react";


class AdminsList extends React.Component{
    state = {
        /*admins: [{name:"Vitaly" , password:"123456"},
        {name:"Ofir" , password:"123123"},
        {name:"Tamar" , password:"654321"}]*/
        admins: []
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
          fetch('http://127.0.0.1:5000/get_admins',
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

              this.setState({ admins: mydata });
              console.log('this.state.admins', this.state.admins)
           });

    }

    //        fetch('http://127.0.0.1:5000/get_admins',
    //             {
    //               'methods':'GET'
    //                }
    //
    //         ).then((response) => {
    //             console.log("response_headers:", response.headers);
    //             console.log("response.status is:", response.status);
    //             console.log("response body is :", response.body);
    //             console.log("response is :", response);
    //               // console.log("response data is  :", response.formData());
    //
    //        })
    //        .catch(error => console.log(error))
    // }
render() {
    return (
    <div className="row2">
        <h1>Current Admins List</h1>

        <ul>
            {
                this.state.admins && this.state.admins.length && this.state.admins.map((item, index) => {

                   return <li key={index}>Name: {item.value} </li>
                })
            }
        </ul>
    </div>

    )

  }

}

/*const AdminsList1 = () => {
  return (
    <div>
      <h1>Current Admins List</h1>
    </div>
  );
};*/

export default AdminsList;