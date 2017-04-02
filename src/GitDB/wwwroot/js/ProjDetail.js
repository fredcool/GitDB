import React, {PropTypes} from 'react';  
import { Grid, Row, Col, FormGroup,
         FormControl, ControlLabel,
         Button, ButtonToolbar, Label } from 'react-bootstrap';
import ProjDetailObjTables from './ProjDetailObjTables';
import GitLogModal from './GitLogModal';
import CommitTextArea from './CommitTextArea';
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
      scriptdata: this.props.scriptdata, //{working copy} and {committed file} and {diff}
      currentProj: this.props.currentProj,
      currentItemName: '',
      currentItemType: '',
      commitmsg:'',
      commitSuccess: false,
      logdata: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.commitChange = this.commitChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getGitLog = this.getGitLog.bind(this);
  }

  //When user clicks an item in DB Items
  handleClick(itemName, type) {
    console.log("Click in ProjDetail");
    console.log(itemName);
    console.log(type);
    //Already got the table, sp, func details in this.state; don't need to call API again
    switch(type) {
      case "tables":
        console.log(this.state.tableItems);
        this.state.tableItems.forEach(item => {
          if(item.Name === itemName) {
            let scriptObj = { workingcopy: item.CurrentDefinition,
                              committedfile: item.CommittedDefinition,
                              diff: item.Diff };
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
                              committedfile: item.CommittedDefinition,
                              diff: item.Diff };
            this.setState({ scriptdata: scriptObj,
                            currentItemName: itemName,
                            currentItemType: "SP"  });
          }
        });
            break;
      case "func":
        this.state.funcItems.forEach(item => {
          if(item.Name === itemName) {
            let scriptObj = { workingcopy: item.CurrentDefinition,
                              committedfile: item.CommittedDefinition,
                              diff: item.Diff };
            this.setState({ scriptdata: scriptObj,
                            currentItemName: itemName,
                            currentItemType: "FUNCTION"  });
          }
        });
            break;
      default:
        console.log("Sorry No Data");
    }
  }

  //When user type commit message in textarea, record every change
  handleChange(event) {
    this.setState({commitmsg: event.target.value});
  }

  commitChange() {
    let requestdata = { projname: this.state.currentProj,
                        commitmsg: this.state.commitmsg,
                        itemtype: this.state.currentItemType,
                        itemname: this.state.currentItemName,
                        workingcopy: this.state.scriptdata.workingcopy };
    console.log("Commit the current data: ");
    console.log(requestdata);

    this.props.actions.commitChange(requestdata);
  }

  componentWillReceiveProps(nextProps) {
    console.log("[Component Will Receive Props]");
    console.log(nextProps);


    //Have to set State here to reflect the change by mapStateToProps()
    this.setState({tableItems: nextProps.tableItems,
                   spItems: nextProps.spItems,
                   funcItems: nextProps.funcItems,
                   currentProj: nextProps.currentProj,
                   commitSuccess: nextProps.commitSuccess,
                   scriptdata: nextProps.scriptdata,
                   commitmsg: '',
                   logdata: nextProps.logdata });
  }

  getGitLog() {
    let requestdata = { projname: this.state.currentProj };
    console.log("Show Project Name");
    console.log(requestdata);
    this.props.actions.getGitLog(requestdata);
  }

  componentDidUpdate(prevProps, prevState){
    console.log("See componentDidUpdate");
    if(this.state.commitSuccess){
      this.props.actions.loadProjectDetail(this.state.currentProj);
    }
  }

  render() {
    console.log("About to render");
    //console.log(this.state.scriptdata);

    return (
      <Grid>
        <Row className="show-grid">
          <ButtonToolbar>
            <Button bsStyle="info" onClick={this.commitChange}>Commit Change</Button>
            <span>  </span>
            <GitLogModal handleClick={this.getGitLog} logdata={this.state.logdata} />
          </ButtonToolbar>
        </Row>
        <Row className="show-grid">
          <Col lg={4}>
            <ProjDetailObjTables data={this.state} handleClick={this.handleClick}/>
          </Col>

          <Col lg={4}>
            <h3><Label>Working Copy</Label></h3>
            <CommitTextArea commitmsg={this.state.commitmsg} handleChange={this.handleChange} />
            <pre>{this.state.scriptdata.workingcopy}</pre>
            <br />
            <h3><Label>Diff</Label></h3>
            <pre>{this.state.scriptdata.diff}</pre>
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

function mapStateToProps(state) {
  console.log("Maping State For ProjDetail");
  console.log(state);
  console.log("Own Props");
  //console.log(ownProps);
  const tableItems = Object.assign([], state.projdetail.TableItems)
  const spItems = Object.assign([], state.projdetail.StoredProcedureItems)
  const funcItems = Object.assign([], state.projdetail.FunctionItems)
  const projName = state.projdetail.currentproj;
  const commitSuccess = state.projdetail.commitSuccess;
  const logdata = state.projdetail.logdata;

  return {
    tableItems: tableItems,
    spItems: spItems,
    funcItems: funcItems,
    currentProj: projName,
    commitSuccess: commitSuccess,
    logdata: logdata
  }
}

ProjDetail.propTypes = {
  tableItems: PropTypes.array.isRequired
}

ProjDetail.defaultProps = {
  tableItems: [],
  spItems:[],
  funcItems:[],
  scriptdata: {workingcopy: "", committedfile: "", diff:""},
  currentProj: "",
  commitSuccess: false,
  logdata: ""
};


export default connect(mapStateToProps, mapDispatchToProps)(ProjDetail);