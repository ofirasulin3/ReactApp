
import React from "react";


class AdminsList extends React.Component{
    state = {
        /*admins: [{name:"Vitaly" , password:"123456"},
        {name:"Ofir" , password:"123123"},
        {name:"Tamar" , password:"654321"}]*/
        admins: []
    };

    componentDidMount() {
        fetch('https://swapi.dev/api/people/').then(data => data.json()).then(res => {
            this.setState(() => {
                const ar = res.results;
                return {
                    admins: ar
                }
            })
        })
    }


render() {
    return (
    <div className="row2">
        <h1>Current Admins List</h1>
        <ul>
            {
                this.state.admins && this.state.admins.length && this.state.admins.map((item, index) => {
                   return <li key={index}>Name: {item.name} | Password: {item.password}</li>
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