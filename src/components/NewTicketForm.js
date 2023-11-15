import React from "react";
import PropTypes from "prop-types";
import { v4 } from 'uuid'; //give the new form submissions their own unique id

function NewTicketForm(props) { //props gives the form access to the props from TicketControl
  return (
    <React.Fragment>
      <form onSubmit={handleNewTicketFormSubmission}>
        <input
          type='text'
          name='names'
          placeholder='Pair Names' />
        <input
          type='text'
          name='location'
          placeholder='Location' />
        <textarea
          name='issue'
          placeholder='Describe your issue' />
        <button type='submit'>Help!</button>
      </form>
    </React.Fragment>
  )

  function handleNewTicketFormSubmission(event) {
    event.preventDefault();
    props.onNewTicketCreation({ //from the properties that are passed down...
      names: event.target.names.value, //target each of the props and assign them a value from the form submission
      location: event.target.location.value,
      issue: event.target.issue.value,
      id: v4() //give each form submission its own id
    }); //this function is a callback to the handleAddinfNewTicketToList method in ticket control

  }
}

NewTicketForm.propTypes = { //onNewTicketCreation prop that is passed in is the parent function from the ticket control to update the state of mainTicketList
  onNewTicketCreation: PropTypes.func
};

export default NewTicketForm;