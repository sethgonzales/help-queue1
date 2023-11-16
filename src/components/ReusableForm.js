import React from "react";
import PropTypes from "prop-types";

function ReusableForm(props) { //this is the form for editing and creating a new ticket
  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}> {/*calls the form submission handler once submitted */}
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
          placeholder='Describe your issue.' />
        <button type='submit'>{props.buttonText}</button> {/*the button text that is shown is a property based on the desired action */}
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;
