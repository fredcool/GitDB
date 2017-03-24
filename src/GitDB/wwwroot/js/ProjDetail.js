import React, {PropTypes} from 'react';  
import {connect} from 'react-redux';
import { Grid, Row, Col, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';
import ProjDetailObjTables from './ProjDetailObjTables';
import apitest from './client/apitest';


export default class ProjDetail extends React.Component {
  constructor(props) {
    super(props);


    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Click in ProjDetail");

  }

  render() {
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