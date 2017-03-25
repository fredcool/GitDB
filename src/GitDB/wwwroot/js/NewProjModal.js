import React from 'react';
import { Popover, Tooltip, Button, Modal, OverlayTrigger,
         Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import * as projActions from './actions/projActions';
import {connect} from 'react-redux';


class NewProjModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.save = this.save.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  save() {
    //let data = "shine";
    let userinput = { projname: this.state.projname,
                      host: this.state.host,
                      username: this.state.username,
                      password: this.state.password,
                      dbname: this.state.dbname };
    console.log(userinput);

    this.props.actions.createProject(userinput);
    this.close();
  }

  close() {
    this.setState({ showModal: false });

  }

  open() {
    this.setState({ showModal: true });
  }

  handleChange(event) {
    let stateName = event.target.name;
    //let obj = { [stateName] : event.target.value };

    this.setState({ [stateName] : event.target.value });
  }

  render() {
    const popover = (
      <Popover id="modal-popover" title="popover">
        very popover. such engagement
      </Popover>
    );
    const tooltip = (
      <Tooltip id="modal-tooltip">
        wow.
      </Tooltip>
    );

    return (
      <div>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
          New Project
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <Form horizontal>
              <FormGroup controlId="formHorizontalProjName">
                <Col componentClass={ControlLabel} sm={3}>
                  Project Name
                </Col>
                <Col sm={9}>
                  <FormControl name="projname" 
                    placeholder=""
                    value={this.state.projname}
                    onChange={this.handleChange} />
                </Col>
              </FormGroup>

              <h5>Database Config</h5>
              <FormGroup controlId="formHorizontalHost">
                <Col componentClass={ControlLabel} sm={3}>
                  Host
                </Col>
                <Col sm={9}>
                  <FormControl name="host" 
                               placeholder=""
                               value={this.state.host}
                               onChange={this.handleChange} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUserNmae">
                <Col componentClass={ControlLabel} sm={3}>
                  User Name
                </Col>
                <Col sm={9}>
                  <FormControl name="username" 
                               placeholder=""
                               value={this.state.username}
                               onChange={this.handleChange} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={3}>
                  Password
                </Col>
                <Col sm={9}>
                  <FormControl name="password"
                               placeholder=""
                               value={this.state.password}
                               onChange={this.handleChange} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalDatabase">
                <Col componentClass={ControlLabel} sm={3}>
                  Database
                </Col>
                <Col sm={9}>
                  <FormControl name="dbname"
                               placeholder=""
                               value={this.state.dbname}
                               onChange={this.handleChange} />
                </Col>
              </FormGroup>
             </Form>

            <hr />
            <Form>
              <h5>Remote (Optional)</h5>
              <FormGroup controlId="formHorizontalGitUrl">
                <Col componentClass={ControlLabel} sm={3}>
                  Git URL
                </Col>
                <Col sm={9}>
                  <FormControl type="giturl" placeholder="" />
                </Col>
              </FormGroup>
              <br/>
            </Form>


          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.save}>Create</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(projActions, dispatch)
  };
}

function mapStateToProps(state, ownProps) {
  console.log("Maping State In NewProjModal");
  console.log(state);
  return {
    projects: state
  }
}

NewProjModal.propTypes = {

}

NewProjModal.defaultProps = {
  projname: "",
  host: "",
  username: "",
  password: "",
  dbname: ""
};

export default connect(mapStateToProps, mapDispatchToProps)(NewProjModal);
