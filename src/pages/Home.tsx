
import React from "react";


const Home = (props) => {
  return (
    <div className="row2">
      <h1>Home</h1>
      <p className="about">Welcome back {props.user}!</p>
    </div>
  );
};

export default Home;