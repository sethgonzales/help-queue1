import React from 'react';
import Ticket from './Ticket';
import PropTypes from "prop-types";

function TicketList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList.map((ticket) => //iterate of an array of tickets, For each ticket render a ticket component
        <Ticket //passing props to ticket component
          whenTicketClicked = { props.onTicketSelection }   //basically creates the event listener for each ticket that triggers the onTicketSelection method. prop is named whenTicketClicked because onTicketSelection is itself a prop from the TicketControl component
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}/> //what is the point of both key and id.. why not just id if key cant be passed
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array,
  onTicketSelection: PropTypes.func
};

export default TicketList;
