import React, {PropTypes}  from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {Link} from 'react-router';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import {connect} from 'react-redux';
import NewProjModal from './NewProjModal'; 
import {bindActionCreators} from 'redux';  
import * as projActions from './actions/projActions';
import * as url from './baseUrl';


import 'fixed-data-table/dist/fixed-data-table.min.css';

//LinkCell is a functional object
const LinkCell = ({rowIndex, data, handleClick, ...props}) => {
  let str = data[rowIndex];
  return (
    <Link to={url.projDetailUrl} onClick={handleClick.bind(this,str)}>
      <Cell {...props}>
        {str}
      </Cell>
    </Link>
  );
};

const TextCell = ({rowIndex, data, ...props}) => (
    <Cell {...props}>
      {data[rowIndex]}
    </Cell>
);

class ProjListTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projects: this.props.projects
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(projname) {
    //console.log("ProjectName Here!");
    let requestdata = projname;
    //console.log(requestdata);

    this.props.actions.loadProjectDetail(requestdata);
    console.log("User clicks a table!");
  }

  componentWillReceiveProps(nextProps) {
    console.log("Proj List -[Component Will Receive Props]");
    console.log(nextProps.projects);
    this.setState({ projects: nextProps.projects });
  }

  componentDidUpdate(prevProps, prevState){
    console.log("See componentDidUpdate");
    if(this.props.projects.projCreated){
      console.log("yay");
      this.props.actions.loadProjects();
    }
  }

  render() {
    const data = this.props.projects.projects;
    const projNameList = data.map( d => d.ProjectName );
    const dbList = data.map( d => d.Database );
    const hostList = data.map( d => d.Host);
    //console.log("Show Actions: ");
    //console.log(this.props.actions);

    return (
      <div>
        <NewProjModal />
        <br/>
        <Table
          rowsCount={this.props.projects.projects.length}
          rowHeight={50}
          headerHeight={50}
          width={940}
          height={500}>
          <Column
            header={<Cell>Project Name</Cell>}
            cell={<LinkCell data={projNameList} handleClick={this.handleClick}/>}
            fixed={true}
            width={280}
          />
          <Column
            header={<Cell>Database</Cell>}
            cell={<TextCell data={dbList} />}
            fixed={true}
            width={260}
          />
          <Column
            header={<Cell>GitHub URL</Cell>}
            cell={<TextCell data={hostList} />}
            fixed={true}
            width={400}
          />
        </Table>
      </div>
    );
  }

}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(projActions, dispatch)
  };
}

function mapStateToProps(state) {
  console.log("Maping State");
  console.log(state);
  return {
    projects: state.projects
  }
}

ProjListTable.propTypes = {
  projects: PropTypes.object,
  actions: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjListTable);  
