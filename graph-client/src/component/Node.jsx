import React from 'react';
import {connect} from 'react-redux';
import { updateList as updateVertexList} from '../action/VertexAction.jsx';
import {updateList} from '../action/SelectAction.jsx';
import { updateEdgeList } from '../action/EdgeAction.jsx';

class Node extends React.Component{


	onDragEnd(event){
		const index = this.props.index;
		var list = [...this.props.list];
		var edgeList = [...this.props.edgeList];

		var panelX = event.currentTarget.parentNode.getBoundingClientRect().left;
		var panelY = event.currentTarget.parentNode.getBoundingClientRect().top;
		list[this.props.index].top = event.pageY - panelY - window.pageYOffset;
		list[this.props.index].left = event.pageX - panelX  - window.pageXOffset;
		// console.log(event.currentTarget.parentNode.parentNode.getBoundingClientRect().top);

		this.props.dispatch(updateVertexList(list));
		

		for( var i of edgeList.keys()){
			if(edgeList[i].index1 === index){
				edgeList[i].top1 = list[index].top;
				edgeList[i].left1 = list[index].left;
				this.props.dispatch(updateEdgeList(edgeList));
			}
			if(edgeList[i].index2 === index){
				edgeList[i].top2 = list[index].top;
				edgeList[i].left2 = list[index].left;
				this.props.dispatch(updateEdgeList(edgeList));
			}
		}

		// var parent = event.currentTarget.parentNode;
	}


	selectVertices(){
		const index = this.props.index;
		const vertex = this.props.vertex;
		var list = [...this.props.list];
		var selectedList = [...this.props.selectedList];

		for( var i of selectedList.keys()){
			if(selectedList[i].index === index){
				selectedList.splice(i,1);
				list[index].selected = '';
				this.props.dispatch(updateList(selectedList));
				this.props.dispatch(updateVertexList(list));
				return;
			}
		}
		list[index].selected = 'selected';
		selectedList.push({
			index: index,
			vertex: vertex,
		})
		this.props.dispatch(updateList(selectedList));
		this.props.dispatch(updateVertexList(list));
	}

	render(){
		return (
			<div draggable='true' className={ 'node ' + this.props.vertex.selected } style={{top: this.props.vertex.top, left: this.props.vertex.left}}
			onDragEnd={this.onDragEnd.bind(this)}>
				<div className='vertex' onDoubleClick = {this.selectVertices.bind(this)}>
					{this.props.vertex.data}
				</div>
			</div>


		)
	}
}

const mapStateToProps = (store) => {
	return {
		list: store.VertexReducer.list,
		form: store.VertexReducer.form,
		selectedList: store.SelectReducer.list,
		edgeList: store.EdgeReducer.list,
	}
}

export default connect(mapStateToProps)(Node);