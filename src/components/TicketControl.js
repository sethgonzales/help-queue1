import React from 'react';
import NewTicketForm from "./NewTicketForm";
import TicketList from "./TicketList";
import TicketDetail from './TicketDetail';

class TicketControl extends React.Component { 
  
  constructor(props){
    super(props);
    this.state = {
      formVisibleOnPage: false, //this tells our object the state of the new ticket form on the page. Separate each new key value pair with a comma 
      mainTicketList: [], //initialize main ticket list as an empty array. this is passed down as a prop
      selectedTicket: null //new state for looking at a specific ticket detail. set to null since we are not looking at a specific ticket
    };
  }

  handleAddingNewTicketToList = (newTicket) => {
    const newMainTicketList = this.state.mainTicketList.concat(newTicket); //set new variable equal to the state of the mainTicketList. concat makes a copy of that array
    this.setState({mainTicketList: newMainTicketList, formVisibleOnPage: false}); //only alter state with setState!
  }

  handleClick = () => { //arrow function here binds 'this' to the handle click
    this.setState(prevState => ({
      formVisibleOnPage: !prevState.formVisibleOnPage
    })); //when the button is clicked, this will change the state of the page and turn the formVisibleOnPage to what ever it is not currently. This will then trigger the new ticket form to be shown or hidden on the page
  }

  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter(ticket => ticket.id === id)[0];//look through the ticket list and filter the tickets by the one matching the id that was passed through
    this.setState({selectedTicket: selectedTicket}); //use setState to mutate the state of the selectedTicket state slice
  }
  render(){
    let currentlyVisibleState = null; //create and set to null since we dont know its value yet
    let buttonText = null; 

if (this.state.selectedTicket != null) { //if we have selected a ticket
      currentlyVisibleState = <TicketDetail ticket = {this.state.selectedTicket} /> //this is the ticket that is visible
      buttonText = "Return to Ticket List";
      // While our TicketDetail component only takes placeholder data, we will eventually be passing the value of selectedTicket as a prop.
    }
    else if (this.state.formVisibleOnPage) { //else if if the form is visible on the page is set to true
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}  />; //what is currently visible should be set to the new ticket form
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