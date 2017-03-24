import React, {PropTypes}  from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import {connect} from 'react-redux';
import projApi from './client/GetAllProject';

import 'fixed-data-table/dist/fixed-data-table.min.css';

//TO DO: Fix redirection to Project Detail Page

//LinkCell is a functional object
const LinkCell = ({rowIndex, data, ...props}) => {
  let str = data[rowIndex];
  return (
    <Cell {...props}>
      {data[rowIndex]}
    </Cell>
  );
};


const TestCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

class ProjListTable extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const data = this.props.projects.projects;
    const projNameList = data.map( d => d.ProjectName );
    const dbList = data.map( d => d.Database );
    const hostList = data.map( d => d.Host);

    return (
      <Table
        rowsCount={this.props.projects.projects.length}
        rowHeight={100}
        headerHeight={50}
        width={940}
        height={500}>
        <Column
          header={<Cell>Project Name</Cell>}
          cell={<LinkCell data={projNameList} />}
          fixed={true}
          width={280}
        />
        <Column
          header={<Cell>Database</Cell>}
          cell={<LinkCell data={dbList} />}
          fixed={true}
          width={260}
        />
        <Column
          header={<Cell>GitHub URL</Cell>}
          cell={<LinkCell data={hostList} />}
          fixed={true}
          width={400}
        />
      </Table>
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
