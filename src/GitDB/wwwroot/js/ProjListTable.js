import React, {PropTypes}  from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import {Link} from 'react-router';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import {connect} from 'react-redux';
import projApi from './client/GetAllProject';
import NewProjModal from './NewProjModal';


import 'fixed-data-table/dist/fixed-data-table.min.css';

//TO DO: Fix redirection to Project Detail Page

//LinkCell is a functional object
const LinkCell = ({rowIndex, data, handleClick, ...props}) => {
  const baseUrl = "/src/GitDB/wwwroot/";
  const projDetailUrl = baseUrl + "projdetail";
  return (
    <Link to={projDetailUrl} onClick={handleClick}>
      <Cell {...props}>
        {data[rowIndex]}
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

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("User clicks a table!");
  }

  render() {
    const data = this.props.projects.projects;
    const projNameList = data.map( d => d.ProjectName );
    const dbList = data.map( d => d.Database );
    const hostList = data.map( d => d.Host);

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

function mapStateToProps(state, ownProps) {
  console.log("Maping State");
  console.log(state);
  return {
    projects: state
  }
}

ProjListTable.propTypes = {
  projects: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(ProjListTable);  
