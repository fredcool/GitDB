import React, {PropTypes} from 'react';  
import { Grid, Row, Col, FormGroup,
         FormControl, ControlLabel,
         Button, ButtonToolbar, Label } from 'react-bootstrap';
import ProjDetailObjTables from './ProjDetailObjTables';
import {bindActionCreators} from 'redux';
import * as projActions from './actions/projActions';
import {connect} from 'react-redux';

class ProjDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableItems: this.props.tableItems,
      spItems: this.props.spItems,
      funcItems: this.props.funcItems,
      scriptdata: this.props.scriptdata,
      currentProj: this.props.currentProj,
      changedscript: '',
      currentItemName: '',
      currentItemType: '',
    };
    this.handleClick = this.handleClick.bind(this);
    this.commitChange = this.commitChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick(itemName, type) {
    console.log("Click in ProjDetail");
    console.log(itemName);
    console.log(type);
    switch(type) {
      case "tables":
        this.state.tableItems.forEach(item => {
          if(item.Name === itemName) {
            let scriptObj = { workingcopy: item.CurrentDefinition,
                              committedfile: item.CommittedDefinition };
            this.setState({ scriptdata: scriptObj,
                            currentItemName: itemName,
                            currentItemType: "TABLE" });
          }
        });
            break;
      case "sp":
        this.state.spItems.forEach(item => {
          if(item.Name === itemName) {
            let scriptObj = { workingcopy: item.CurrentDefinition,
                              committedfile: item.CommittedDefinition };
            this.setState({ scriptdata: scriptObj,
                            currentItemName: itemName,
                            currentItemType: "FUNCTIONS"  });
          }
        });
            break;
      case "func":
        this.state.funcItems.forEach(item => {
          if(item.Name === itemName) {
            let scriptObj = { workingcopy: item.CurrentDefinition,
                              committedfile: item.CommittedDefinition };
            this.setState({ scriptdata: scriptObj,
                            currentItemName: itemName,
                            currentItemType: "FUNCTIONS"  });
          }
        });
            break;
      default:
        console.log("Sorry No Data");
    }
  }

  handleChange(event) {
    this.setState({changedscript: event.target.value});
  }

  //TO DO: get project name
  commitChange() {
    let requestdata = { projname: this.state.currentProj,
                        commitmsg: 'Default',
                        itemtype: this.state.currentItemType,
                        itemname: this.state.currentItemName,
                        changedscript: this.state.changedscript };
    console.log(requestdata);

    //BUG: projname
    this.props.actions.commitChange(requestdata);
  }

  componentWillReceiveProps(nextProps) {
    console.log("[Component Will Receive Props]");
    console.log(nextProps);

    this.setState({tableItems: nextProps.tableItems,
                   spItems: nextProps.spItems,
                   funcItems: nextProps.funcItems});
  }

  componentDidMount() {

  }

  render() {
    console.log("About to render");
    console.log(this.state.scriptdata);

    return (
      <Grid>
        <Row className="show-grid">
          <ButtonToolbar>
            <Button bsStyle="info" onClick={this.commitChange}>Commit Change</Button>
            <Button bsStyle="info">Git Log</Button>
          </ButtonToolbar>
        </Row>
        <Row className="show-grid">
          <Col lg={4}>
            <ProjDetailObjTables data={this.state} handleClick={this.handleClick}/>
          </Col>

          <Col lg={4}>
            <h3><Label>Working Copy</Label></h3>
            <FormGroup controlId="formControlsTextarea">
              <FormControl componentClass="textarea"
                           placeholder="Please edit your script here before commit."
                           rows="5"
                           value={this.state.changedscript}
                           onChange={this.handleChange} />
            </FormGroup>
            <pre>{this.state.scriptdata.workingcopy}</pre>
          </Col>

          <Col lg={4}>
            <h3><Label>Committed File</Label></h3>
            <pre>{this.state.scriptdata.committedfile}</pre>
          </Col>
        </Row>
      </Grid>
    )
  }

}

function mapDispatchToProps(dispatch) {  
  return {
    actions: bindActionCreators(projActions, dispatch)
  };
}

function mapStateToProps(state, ownProps) {
  console.log("Maping State For ProjDetail");
  console.log(state);
  const tableItems = Object.assign([], state.projdetail.TableItems)
  const spItems = Object.assign([], state.projdetail.StoredProcedureItems)
  const funcItems = Object.assign([], state.projdetail.FunctionItems)
  const projName = state.projdetail.currentproj;

  return {
    tableItems: tableItems,
    spItems: spItems,
    funcItems: funcItems,
    currentProj: projName
  }
}

ProjDetail.propTypes = {
  tableItems: PropTypes.array.isRequired
}

ProjDetail.defaultProps = {
  tableItems: [],
  spItems:[],
  funcItems:[],
  scriptdata: {workingcopy: "", committedfile: ""},
  currentProj: ""
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjDetail);