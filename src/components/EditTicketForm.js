import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";


function EditTicketForm(props) {
  const { ticket } = props; //grabs the form

  function handleEditTicketFormSubmission(event) { //runs function via editing ticket prop
    event.preventDefault(); 
    props.onEditTicket({ 
      names: event.target.names.value, 
      location: event.target.location.value, 
      issue: event.target.issue.value, 
      id: ticket.id });
  }

  return (
    <React.Fragment>
      <ReusableForm //update event handler on reusable form to trigger the handle edit ticket form submission and a new button name
        formSubmissionHandler={handleEditTicketFormSubmission}
        buttonText="Update Ticket" />
    </React.Fragment>
  );
}


EditTicketForm.propTypes = {
  ticket: PropTypes.object,
  onEditTicket: PropTypes.func
};


export default EditTicketForm;
