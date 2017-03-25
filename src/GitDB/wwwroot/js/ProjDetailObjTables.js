import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
//import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';


const LinkCell = ({rowIndex, name, handleClick, ...props}) => {
  let str = name[rowIndex];
  return (
      <Cell {...props}>
        {str}
      </Cell>
  );
};

export default class ProjDetailObjTables extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    //var {dataList} = this.state;
    const tableItems = this.props.data.tableItems;
    const tableNameList = tableItems.map( item => item.Name )
    const spItems = this.props.data.spItems;
    const spNameList = spItems.map( item => item.Name )
    const funcItems = this.props.data.funcItems;
    const funcNameList = funcItems.map( item => item.Name )

    //console.log(tableNameList);


    return (
      <div>
        <h4>Database Objects</h4>
        <Table
        rowsCount={tableNameList.length}
        rowHeight={40}
        headerHeight={50}
        width={300}
        height={200}>
          <Column
            header={<Cell>Tables</Cell>}
            cell={<LinkCell name={tableNameList}
                            func={this.props.handleClick} />}
            fixed={true}
            width={300}/>
        </Table>
        <br/>
        <Table
        rowsCount={spNameList.length}
        rowHeight={40}
        headerHeight={50}
        width={300}
        height={200}>
          <Column
            header={<Cell>Stored Procedures</Cell>}
            cell={<LinkCell name={spNameList}
                            func={this.props.handleClick} />}
            fixed={true}
            width={300}/>
        </Table>
        <br/>
        <Table
        rowsCount={funcNameList.length}
        rowHeight={40}
        headerHeight={50}
        width={300}
        height={200}>
          <Column
            header={<Cell>Functions</Cell>}
            cell={<LinkCell name={funcNameList}
                            func={this.props.handleClick} />}
            fixed={true}
            width={300}/>
        </Table>
      </div>
    )
  }
}

ProjDetailObjTables.propTypes = {
  data: React.PropTypes.object.isRequired,
  objId: React.PropTypes.number,
  objType: React.PropTypes.string,
  objName: React.PropTypes.string,
  handleClick: React.PropTypes.func
}

ProjDetailObjTables.defaultProps = {
  objTable: 'table',
  objName: 'cathy_test'
};
