import React, {PropTypes}  from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import ProjectListStore from './helpers/ProjectListStore';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import 'fixed-data-table/dist/fixed-data-table.min.css';



//TO DO: Fix redirection to Project Detail Page
const LinkCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
      <Link to="/projdetail">{data.getObjectAt(rowIndex)[col]}</Link>
    </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[col]}
  </Cell>
);

export default class ProjListTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
      projectList: new ProjectListStore()
    };
  }

  //ajax call testing
  componentDidMount() {
    this.state.projectList.printResponse();
  }

  render() {
    var {dataList} = this.state;
    return (
      <Router>
        <Table
          rowsCount={dataList.getSize()}
          rowHeight={50}
          headerHeight={50}
          width={940}
          height={500}>
          <Column
            header={<Cell>Project Name</Cell>}
            cell={<LinkCell data={dataList} col="companyName" />}
            fixed={true}
            width={280}
          />
          <Column
            header={<Cell>Database</Cell>}
            cell={<LinkCell data={dataList} col="dbname" />}
            fixed={true}
            width={260}
          />
          <Column
            header={<Cell>GitHub URL</Cell>}
            cell={<LinkCell data={dataList} col="url" />}
            fixed={true}
            width={400}
          />
        </Table>
      </Router>
    );
  }

}

function mapStateToProps(state, ownProps) {
  return {
    projects: state.projs
  }
}

ProjListTable.propTypes = {
  projects: PropTypes.array
}

