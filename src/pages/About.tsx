
import React from "react";

const About = () => {
  return (
    <div class="row">
      <h1>About</h1>
      <p className="about">A Telegram Polls Manager web application.
      This app includes a Telegram bot interface for user registration and poll answering.
      Admins define polls questions and submit them for the users.
      The system's users will get poll questions through a Telegram bot and respond with their votes.
      Polls can reach everyone or a subset of relevant users.
      The web page interface is used for admins registration, charts and statistics display, and polls broadcasting to users through Telegram.
      </p>
    </div>
  );
};

export default About;