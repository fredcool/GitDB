import React, {PropTypes} from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class GitLogModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
    this.props.handleClick();
  }

  render() {
    //console.log(this.props);
    return (
      <div>
        <Button
          bsStyle="info"
          onClick={this.open}
        >
          Git Log
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Git Log</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <pre>{this.props.logdata}</pre>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }

}

GitLogModal.propTypes = {
  handleClick: PropTypes.func.isRequired
}
