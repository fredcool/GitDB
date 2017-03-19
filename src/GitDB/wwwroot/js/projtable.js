import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';

import 'fixed-data-table/dist/fixed-data-table.min.css';

const LinkCell = ({rowIndex, data, col, ...props}) => (
	<Cell {...props}>
		<a href="#">{data.getObjectAt(rowIndex)[col]}</a>
	</Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
	<Cell {...props}>
		{data.getObjectAt(rowIndex)[col]}
	</Cell>
);

export default class ProjTable extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataList: new FakeObjectDataListStore(1000000),
		};
	}

	render() {
		var {dataList} = this.state;
		return (
			<Table
				rowsCount={dataList.getSize()}
				rowHeight={50}
				headerHeight={50}
				width={1000}
				height={500}>
				<Column
					header={<Cell>Project Name</Cell>}
					cell={<LinkCell data={dataList} col="firstName" />}
					fixed={true}
					width={100}
				/>
			</Table>
		);
	}

}




