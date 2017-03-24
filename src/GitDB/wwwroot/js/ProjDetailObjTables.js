import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
//import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';


const LinkCell = ({rowIndex, type, name, func, ...props}) => (
    <Cell {...props}>
      <a href="#" onClick={func}>{name}</a>
    </Cell>
);

export default class ProjDetailObjTables extends React.Component {
  constructor(props) {
    super(props);

    /*this.state = {
      dataList: new FakeObjectDataListStore(1000000),
    };*/
  }

  render() {
    //var {dataList} = this.state;
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
            cell={<LinkCell type={this.props.objType}
                            name={this.props.objName}
                            func={this.props.handleClick} />}
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

ProjDetailObjTables.propTypes = {
  objId: React.PropTypes.number,
  objType: React.PropTypes.string,
  objName: React.PropTypes.string,
  handleClick: React.PropTypes.func
}

ProjDetailObjTables.defaultProps = {
  objTable: 'table',
  objName: 'cathy_test'
};
