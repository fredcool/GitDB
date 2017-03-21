import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';


const LinkCell = ({rowIndex, data, col, ...props}) => (
    <Cell {...props}>
      <a href="#">{data.getObjectAt(rowIndex)[col]}</a>
    </Cell>
);

export default class ProjDetailObjTables extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };
  }

  render() {
    var {dataList} = this.state;
    return (
      <div>
        <h4>Database Objects</h4>
        <Table
        rowsCount={5}
        rowHeight={40}
        headerHeight={50}
        width={300}
        height={200}>
          <Column
            header={<Cell>Tables</Cell>}
            cell={<LinkCell data={dataList} col="tableName" />}
            fixed={true}
            width={300}/>
        </Table>
        <br/>
        <Table
        rowsCount={5}
        rowHeight={40}
        headerHeight={50}
        width={300}
        height={200}>
          <Column
            header={<Cell>Stored Procedure</Cell>}
            cell={<Cell>fred_test</Cell>}
            fixed={true}
            width={300}/>
        </Table>
      </div>
    )
  }
}