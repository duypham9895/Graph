import React from 'react';
import { connect } from 'react-redux';

import Node from './Node.jsx';

import { updateList as updateVertexList } from '../action/VertexAction.jsx';
import { updateEdgeList, updateWeightList } from '../action/EdgeAction.jsx';

class Panel extends React.Component{
// https://graph-online.herokuapp.com/api/graphs
// http://localhost:5000/api/graphs
	async componentWillMount(){
		const res = await fetch('http://localhost:5000/api/graphs', {
			method: 'GET',
			mode: 'cors',
			headers:{
				'Content-Type': 'application/json',
				'Accept' : 'application/json',
			},
		})
		.then((res) => {
			if(res.status === 200 ){
				return res.json();
			}
			return null;
		});

		if(res !== null){
			this.props.dispatch(updateVertexList(res.vertices));
			this.props.dispatch(updateEdgeList(res.edges));
			var arrWeight = [];
			for ( var i = 0; i < res.vertices.length; i++){
				arrWeight.push([]);
				for ( var j = 0; j < res.vertices.length; j++){
					arrWeight[i].push(Infinity);
				}
			}

			for(var edge of res.edges){
				arrWeight[edge.index1][edge.index2] = edge.weight;
				arrWeight[edge.index2][edge.index1] = edge.weight;
			}

			this.props.dispatch(updateWeightList(arrWeight));

		}
	}

	render(){
		const edges = this.props.edgeList;

		return(

			<div className='panel' id='panel'>
				{
					this.props.list.map((vertex, index) => {
						return(
							<Node key={index} index={index} vertex={vertex} />
						)
					})
				}
				<svg className='svg' style={{height: '200vh', width: '200vw' }}>
					{
						edges.map((e, index) => {
							return (
								<line className={'svg-line ' + e.highlight} key={index} x1={ e.left1 } y1={ e.top1 } x2={ e.left2 } y2={ e.top2 }  ></line>
							)
						})
					}
					{
						edges.map((e, index) => {
							return (
								<text key={index} x={ ((e.left1 + e.left2)/2)} y={ ((e.top1+e.top2)/2)}></text>
							)
						})
					}
				</svg>
			</div>
		)
	}
}

const mapStateToProps = (store) => {
	return {
		list: store.VertexReducer.list,
		edgeList: store.EdgeReducer.list,
		flag: store.EdgeReducer.flag,
	}
}

export default connect(mapStateToProps)(Panel);