import React from "react";
import PropTypes from "prop-types";

function TicketDetail(props){
  const { ticket, onClickingDelete } = props; //object destructuring derives the ticket object from our props. Otherwise, for a ticket attribute like location, we'd need to say props.ticket.location instead of just ticket.location later on

  return (
    <React.Fragment>
      <h1>Ticket Detail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <button onClick={ props.onClickingEdit }>Update Ticket</button> { /* update button that calls on the edit method for that ticket */ }
      <button onClick={()=> onClickingDelete(ticket.id) }>Close Ticket</button> {/*delete  with an on click handler that calls onClickingDelete and passes on the ticket id */}
      <hr/>
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object, //each ticket is an object
  onClickingDelete: PropTypes.func, //on clicking delete is a function
  onClickingEdit: PropTypes.func //editing prop is a function
} 

export default TicketDetail;
