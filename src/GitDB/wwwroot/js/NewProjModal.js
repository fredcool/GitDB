import React from 'react';
import { Popover, Tooltip, Button, Modal, OverlayTrigger,
         Form, FormGroup, FormControl, Col, ControlLabel } from 'react-bootstrap';


export default class NewProjModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  getInitialState() {
    return { showModal: false };
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
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
                  <FormControl type="projname" placeholder="ProjName" />
                </Col>
              </FormGroup>

              <h5>Database Config</h5>
              <FormGroup controlId="formHorizontalHost">
                <Col componentClass={ControlLabel} sm={3}>
                  Host
                </Col>
                <Col sm={9}>
                  <FormControl type="host" placeholder="Host" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalUserNmae">
                <Col componentClass={ControlLabel} sm={3}>
                  User Name
                </Col>
                <Col sm={9}>
                  <FormControl type="username" placeholder="UserName" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={3}>
                  Password
                </Col>
                <Col sm={9}>
                  <FormControl type="password" placeholder="Password" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalDatabase">
                <Col componentClass={ControlLabel} sm={3}>
                  Database
                </Col>
                <Col sm={9}>
                  <FormControl type="database" placeholder="" />
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
            <Button onClick={this.close}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }

}