import React, {PropTypes} from 'react';  
import {connect} from 'react-redux';
import { Grid, Row, Col, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';
import ProjDetailObjTables from './ProjDetailObjTables';
import configureStore from './store/configureStore'; 

class ProjDetail extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Click in ProjDetail");

  }

  render() {
    const data = this.props.data;
    console.log("7777");
    //console.log(data);
    const store = configureStore();
    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    )

    return (
      <Grid>
        <Row className="show-grid">
          <Col lg={4}>
            <ProjDetailObjTables handleClick={this.handleClick}/>
          </Col>

          <Col lg={4}>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Working Copy</ControlLabel>
              <FormControl componentClass="textarea" placeholder="textarea" />
            </FormGroup>
          </Col>

          <Col lg={4}>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Committed File</ControlLabel>
              <FormControl componentClass="textarea" placeholder="textarea" />
            </FormGroup>
          </Col>
        </Row>
      </Grid>
    )
  }

}

function mapStateToProps(state, ownProps) {
  console.log("Maping State For ProjDetail");
  console.log(state);
  return {
    data: state
  }
}

ProjDetail.propTypes = {

}

export default connect(mapStateToProps)(ProjDetail); 