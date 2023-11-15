import React from "react";
import Header from "./Header"
import TicketControl from "./TicketControl";

function App() {

  return (
    <React.Fragment>
      <Header /> {/*This is where our Header goes */}
      <TicketControl /> {/* This is where the ticket controller goes. */}
    </React.Fragment>
  );
}

export default App;