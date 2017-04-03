import React, {PropTypes} from 'react';  
import { FormGroup, FormControl } from 'react-bootstrap';

export default class CommitTextArea extends React.Component {

  render(){
    return(
      <FormGroup controlId="formControlsTextarea">
        <FormControl componentClass="textarea"
                     placeholder="Please edit your script here before commit."
                     rows="4"
                     value={this.props.commitmsg}
                     onChange={this.props.handleChange} />
      </FormGroup>
    )
  }
}

CommitTextArea.propTypes = {
  commitmsg: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired
}