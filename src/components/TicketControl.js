import React from 'react';
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from './TicketDetail';
import EditTicketForm from './EditTicketForm';


class TicketControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      formVisibleOnPage: false, //this tells our object the state of the new ticket form on the page. Separate each new key value pair with a comma 
      mainTicketList: [], //initialize main ticket list as an empty array. this is passed down as a prop
      selectedTicket: null, // state for looking at a specific ticket detail. set to null since we are not looking at a specific ticket
      editing: false //will turn true when we are editing a ticket
    };
  }

  //new ticket
  handleAddingNewTicketToList = (newTicket) => { //this handles adding a new ticket to our list
    const newMainTicketList = this.state.mainTicketList.concat(newTicket); //set new variable equal to the state of the mainTicketList. concat makes a copy of that array
    this.setState({ mainTicketList: newMainTicketList, formVisibleOnPage: false }); //only alter state with setState!
  }

  //edit a ticket
  handleEditClick = () => {
    console.log("handleEditClick reached!");
    this.setState({ editing: true }); //this will change the state to signal we are editing a ticket
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const editedMainTicketList = this.state.mainTicketList
      .filter(ticket => ticket.id !== this.state.selectedTicket.id) //filter by tickets that are not the one we are trying to edit. this filters the previous version of the ticket OUT of the new state
      .concat(ticketToEdit); //add the edited version of the ticket to the new version of the ticket list
    this.setState({
      mainTicketList: editedMainTicketList, //set the main ticket list equal to the list with the updated ticket
      editing: false, //reset editing and selected ticket to false and null
      selectedTicket: null
    });
  }

  //view a ticket
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];//look through the ticket list and filter the tickets by the one matching the id that was passed through
    this.setState({ selectedTicket: selectedTicket }); //use setState to mutate the state of the selectedTicket state slice
  }



  //delete a ticket
  handleDeletingTicket = (id) => {  //this handles deleting a ticket
    const newMainTicketList = this.state.mainTicketList.filter(ticket => ticket.id !== id); //filter everything that does NOT have the id of the ticket we are deleting
    this.setState({
      mainTicketList: newMainTicketList, //set the state (update the data) to be our new list that does NOT include the ticket we are looking for
      selectedTicket: null //reset the selected ticket back to null so that when the ticket is closed, ticket control ensures that the ticket list is shown instead
    });
  }

  //button click that changes visibility
  handleClick = () => { //handle click toggles visibility of the form for making a new ticket
    if (this.state.selectedTicket != null) { //if a ticket has been selected
      this.setState({
        formVisibleOnPage: false, //turn the form visibility off
        selectedTicket: null, //reset the selected ticket to null
        editing: false //reset edit state to false
      });
    } else {
      this.setState(prevState => ({ //else, switch the form visibility when the button is clicked on
        formVisibleOnPage: !prevState.formVisibleOnPage,
      }));
    }//when the button is clicked, this will change the state of the page and turn the formVisibleOnPage to what ever it is not currently. This will then trigger the new ticket form to be shown or hidden on the page
  }


  render() {
    let currentlyVisibleState = null; //create and set to null since we dont know its value yet
    let buttonText = null;

    if (this.state.editing) { //if we are editing a ticket
      currentlyVisibleState = (
        <EditTicketForm
          ticket={this.state.selectedTicket} //pass in the selected ticket into the edit ticket form method
          onEditTicket={this.handleEditingTicketInList} />
      );
      buttonText = "Return to Ticket List";

    } else if (this.state.selectedTicket != null) { //if we have selected a ticket
      currentlyVisibleState =
        <TicketDetail       //this is the ticket that is visible. passing in our handle delete method, and onclick edit method
          ticket={this.state.selectedTicket}
          onClickingDelete={this.handleDeletingTicket}
          onClickingEdit={this.handleEditClick} />
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.

    } else if (this.state.formVisibleOnPage) { //else if if the form is visible on the page is set to true
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList} />; //what is currently visible should be set to the new ticket form
      buttonText = "Return to Ticket List";

    } else { //or else... just show the list of tickets. If a ticket is clicked on then we open the ticket details. We will need to pass on the ticket id when it is clicked on as a prop
      currentlyVisibleState = <TicketList ticketList={this.state.mainTicketList} onTicketSelection={this.handleChangingSelectedTicket} />;
      buttonText = "Add Ticket";
    }


    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> {/*passing a button into either page. The purpose of the button is to change the state of the page so we can switch back and forth btwn showing tickets and creating tickets*/}
      </React.Fragment>
    );
  }
}

export default TicketControl;