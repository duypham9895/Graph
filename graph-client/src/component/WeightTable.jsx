import React from 'react';
import {connect} from 'react-redux';

// import DataWeightList from '../data/dataWeightList.json';

class WeightTable extends React.Component{

	render(){
		const list = this.props.list;
		const weightList = this.props.weightList;
		// console.table(weightList);
		return(
			<div className='weightTable'>
				<table className='uk-table uk-table-small uk-table-divider'>
					 <caption><h3 className='uk-heading'>Weight Table</h3></caption>
					<thead>
						<tr>
							<th></th>
							{
								list.map((vertex, index) => {
									return(
										<th key={vertex.data} >{vertex.data}</th>
									)
								})
							}
						</tr>
					</thead>
					<tbody>
						{
							list.map((vertex, index) => {
								return(
									<tr key={index}>
										<td>{vertex.data}</td>
										{
											weightList[index].map((weight, index) => {
												return(
													<td key={index}> {weight} </td>
												)
											})
										}
									</tr>
								)
							})
						}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = (store) =>{
	return{
		list: store.VertexReducer.list,
		weightList: store.EdgeReducer.weightList,
	}
}

export default connect(mapStateToProps)(WeightTable);