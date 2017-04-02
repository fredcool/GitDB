import React, { PropTypes } from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
//import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';


const LinkCell = ({rowIndex, name, type, handleClick, ...props}) => {
  let str = name[rowIndex];
  return (
      <Cell {...props}>
        <a href="#" onClick={handleClick.bind(this,str,type)}>{str}</a>
      </Cell>
  );
};

export default class ProjDetailObjTables extends React.Component {
  constructor(props) {
    super(props);

  }

  getTableItemNameList(itemObj){
    return itemObj.map( item => item.Name )
  }

  render() {
    const tableItems = this.props.data.tableItems;
    const tableNameList = this.getTableItemNameList(tableItems);
    const spItems = this.props.data.spItems;
    const spNameList = this.getTableItemNameList(spItems);
    const funcItems = this.props.data.funcItems;
    const funcNameList = this.getTableItemNameList(funcItems);

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
                            type="tables"
                            handleClick={this.props.handleClick} />}
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
                            type="sp"
                            handleClick={this.props.handleClick} />}
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
                            type="func"
                            handleClick={this.props.handleClick} />}
            fixed={true}
            width={300}/>
        </Table>
      </div>
    )
  }
}

ProjDetailObjTables.propTypes = {
  data: PropTypes.object.isRequired,
  objId: React.PropTypes.number,
  objType: React.PropTypes.string,
  objName: React.PropTypes.string,
  handleClick: PropTypes.func
}

ProjDetailObjTables.defaultProps = {
  objTable: 'table',
  objName: 'cathy_test'
};
