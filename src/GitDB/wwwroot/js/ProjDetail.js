import React, {PropTypes} from 'react';  
import {connect} from 'react-redux';
import { Grid, Row, Col, FormGroup,
         FormControl, ControlLabel } from 'react-bootstrap';
import ProjDetailObjTables from './ProjDetailObjTables';
import configureStore from './store/configureStore'; 

class ProjDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableItems: this.props.tableItems,
      spItems: this.props.spItems,
      funcItems: this.props.funcItems
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("Click in ProjDetail");

  }

  componentWillReceiveProps(nextProps) {
    console.log("[Component Will Receive Props]");
    console.log(nextProps);
    //const data = nextProps.projectdetail.TableItems;
    //console.log(data);
    this.setState({tableItems: nextProps.tableItems,
                   spItems: nextProps.spItems,
                   funcItems: nextProps.funcItems});
  }

  componentDidMount() {
    //console.log("componentDidMount");
    //this.setState ({data: this.props.data});
  }

  render() {
    //const datago = this.state;
    console.log("About to render");
    //console.log(datago);
    /*const store = configureStore();
    let unsubscribe = store.subscribe(() =>
      console.log(store.getState())
    )*/

    return (
      <Grid>
        <Row className="show-grid">
          <Col lg={4}>
            <ProjDetailObjTables data={this.state} handleClick={this.handleClick}/>
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
  const tableItems = Object.assign([], state.projdetail.TableItems)
  const spItems = Object.assign([], state.projdetail.StoredProcedureItems)
  const funcItems = Object.assign([], state.projdetail.FunctionItems)

  return {
    tableItems: tableItems,
    spItems: spItems,
    funcItems: funcItems
  }
}

ProjDetail.propTypes = {
  tableItems: PropTypes.array.isRequired
}

ProjDetail.defaultProps = {
  tableItems: [],
  spItems:[],
  funcItems:[],
};


export default connect(mapStateToProps)(ProjDetail); 