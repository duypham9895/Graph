import React from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateForm, updateList, clearAll as clearAllVertex } from '../action/VertexAction.jsx';
import {updateList as updateSelectedList, clearAll as clearAllSelect} from '../action/SelectAction.jsx';
import { updateEdgeForm, updateEdgeList, updateWeightList, clearAll as clearAllEdge } from '../action/EdgeAction.jsx';
import { updatePrevious, clearAll as clearAllDijsktra } from '../action/DijkstraAction.jsx';

class Menu extends React.Component{
	componentDidMount(){
		this.openBtn = document.getElementById('data-modal-open');
		this.closeBtn = document.getElementById('data-modal-close');
		this.openBtnWeight = document.getElementById('weight-modal-open');
		this.closeBtnWeight = document.getElementById('weight-modal-close');
	}

	openDataModal(){
		this.openBtn.click();
		var form = {...this.props.form};
		form.action = 'create';
		this.props.dispatch(updateForm(form));
		
	}

	onDataChange(event){
		const value = event.target.value;
		var form = {...this.props.form};
		const parsedValue = parseInt(value);

		if (  isNaN(parsedValue) ){
			form.data = value;
			this.props.dispatch(updateForm(form));
		} else {
			form.data = parsedValue;
			this.props.dispatch(updateForm(form));
		}
	}

	onWeightChange(event){
		const value = event.target.value;
		var edgeForm = {...this.props.edgeForm};
		const parsedValue = parseInt(value);

		if (  isNaN(parsedValue) ){
			return;
		} else {
			edgeForm.weight = parsedValue;
			this.props.dispatch(updateEdgeForm(edgeForm));
		}
	}



	onDataKeyDown(e){
		if(e.keyCode === 13 ){
			const props = this.props;
			const form = {...props.form};

			if(form.data.length !== 0 && form.action === 'create'){
				var list = [...props.list];

				for(var vertex of list){
					if(form.data === vertex.data){
						alert('Vertex has already existed');
						return;
					}
				}
				list.push({
					data: form.data,
					top: 100,
					left: 100,
				});
				form.data = '';
				props.dispatch(updateForm(form));
				props.dispatch(updateList(list));

				var weightList = [...props.weightList];

				for(var i of weightList.keys()){
					weightList[i].push(Infinity);
				}

				weightList.push([]);
				var lengthWeightList = weightList.length - 1;
				for(i of weightList.keys()){
					weightList[lengthWeightList].push(Infinity);
				}
				weightList[lengthWeightList][lengthWeightList] = 0;
				this.props.dispatch(updateWeightList(weightList));

				var previous = [...props.previous];

				previous.push([]);
				this.props.dispatch(updatePrevious(previous));

			}
			if(form.data.length !== 0 && form.action === 'edit'){
				list = [...props.list];
				var selectedList = [...props.selectedList];

				for(vertex of list){
					if(form.data === vertex.data){
						alert('Vertex has already existed');
						return;
					}
				}

				list[selectedList[0].index].data = form.data;
				list[selectedList[0].index].selected = '';

				selectedList.splice(0,1);
				form.data = '';

				props.dispatch(updateForm(form));
				props.dispatch(updateList(list));
				props.dispatch(updateSelectedList(selectedList));
				this.closeBtn.click();
			}
		}
	}

	onWeightKeyDown(event){
		if(event.keyCode === 13){
			const props = this.props;
			const edgeForm = {...props.edgeForm};
			if(edgeForm.weight > 0 && edgeForm.action === 'connect'){
				var selectedList = [...props.selectedList];
				var edgeList = [...props.edgeList];
				var list = [...props.list];
				var weightList = [...props.weightList];

				const index1 = selectedList[0].index;
				const index2 = selectedList[1].index;
				const weight = edgeForm.weight;

				const cleanUp = () =>{
					edgeForm.action = '';
					edgeForm.weight = '';


					weightList[index1][index2] = weight;
					weightList[index2][index1] = weight;


					list[selectedList[0].index].selected = '';
					selectedList.splice(0,1);

					list[selectedList[0].index].selected = '';
					selectedList.splice(0,1);
					
					props.dispatch(updateList(list));
					props.dispatch(updateEdgeList(edgeList));
					props.dispatch(updateEdgeForm(edgeForm));
					props.dispatch(updateSelectedList(selectedList));
					props.dispatch(updateWeightList(weightList));

					this.closeBtnWeight.click();
				}

				for(var edge of edgeList){
					if( (edge.index1 === index1 && edge.index2 === index2) || (edge.index1 === index2 && edge.index2 === index1) ){
						edge.weight = edgeForm.weight;
						cleanUp();

						return;
					}
				}

				edgeList.push({
					index1: index1,
					top1: selectedList[0].vertex.top,
					left1: selectedList[0].vertex.left,
					index2: index2,
					top2: selectedList[1].vertex.top,
					left2: selectedList[1].vertex.left,
					weight: weight,
					highlight: '',
				})
				cleanUp();
				return;

				
			}
		}
	}

	editVertex(){
		if(this.props.selectedList.length === 0){
			return;
		}
		this.openBtn.click();

		var form = {...this.props.form};

		form.data = this.props.selectedList[0].vertex.data;
		form.action = 'edit';


		this.props.dispatch(updateForm(form));
	}

	connectVertex(event){
		if(this.props.selectedList.length < 2){
			return;
		}
		this.openBtnWeight.click();
		var form = {...this.props.edgeForm};
		
		form.action = 'connect';

		this.props.dispatch(updateEdgeForm(form));

	}

	deleteVertex(){
		var selectedList = [...this.props.selectedList];
		var weightList = [...this.props.weightList];
		var edgeList = [...this.props.edgeList];
		var list = [...this.props.list];

		var index = selectedList[0].index;
		weightList.splice(index,1);
		for(var i of weightList.keys()){
			weightList[i].splice(index, 1);
		}
		this.props.dispatch(updateWeightList(weightList));

		var newEdgeList = [];
		for(i = 0; i < edgeList.length; i++ ){
			if(edgeList[i].index1 === index || edgeList[i].index2 === index){
				continue;
			}
			newEdgeList.push(edgeList[i]);
		}
		this.props.dispatch(updateEdgeList(newEdgeList));

		list.splice(index,1);
		this.props.dispatch(updateList(list));

		selectedList.splice(index,1);
		this.props.dispatch(updateSelectedList(selectedList));
	}

	disconnectVertex(){
		var selectedList = [...this.props.selectedList];
		var weightList = [...this.props.weightList];
		var edgeList = [...this.props.edgeList];

		if(selectedList.length < 2 ){
			return;
		}

		var index1 = selectedList[0].index;
		var index2 = selectedList[1].index;

		weightList[index1][index2] = Infinity;
		weightList[index2][index1] = Infinity;

		this.props.dispatch(updateWeightList(weightList));

		for(var i of edgeList.keys()){
			if((edgeList[i].index1 === index1 && edgeList[i].index2 === index2) || (edgeList[i].index1 === index2 && edgeList[i].index2 === index1) ){
				edgeList.splice(i, 1);
				break;
			}
		}
		this.props.dispatch(updateEdgeList(edgeList));

	}

	deselectAllVertex(){
		var list = [...this.props.list];
		for(var v of list){
			v.selected = '';
		}
		this.props.dispatch(updateList(list));
		this.props.dispatch(clearAllSelect());
	}

	simulation(){
		this.props.history.push('/simulation');
	}

	clearAll(){
		this.props.dispatch(clearAllVertex());
		this.props.dispatch(clearAllSelect());
		this.props.dispatch(clearAllEdge());
		this.props.dispatch(clearAllDijsktra());
	}

	render(){
		return(
			
			<div uk-sticky='animation: uk-animation-slide-top'>
				<div className='menu'>

					<div onClick={this.openDataModal.bind(this)}>
						<i className='fas fa-plus'></i> Add
					</div>

					<div onClick={this.connectVertex.bind(this)}>
						<i className='fas fa-link'></i> Connect
					</div>

					<div onClick={this.disconnectVertex.bind(this)}>
						<i className='fas fa-window-close'></i> Disconnect
					</div>

					<div onClick={this.editVertex.bind(this)}>
						<i className='fas fa-pen'></i> Edit
					</div>

					<div onClick={this.deleteVertex.bind(this)}>
						<i className='fas fa-eraser'></i> Delete
					</div>

					<div onClick={this.deselectAllVertex.bind(this)}>
						<i className='far fa-circle'></i> Deselect
					</div>

					
						<div onClick={this.simulation.bind(this)}>
							<i className='fas fa-project-diagram'></i> Simulation
						</div>
					

					<div onClick={this.clearAll.bind(this)}>
						<i className='fas fa-broom' ></i> Clear All
					</div>

					<div className='hamburger' href='#modal-search' uk-toggle=''>
						<i className='fas fa-bars'></i>
					</div>

				</div>
				<a className='hidden' id='data-modal-open' href='#data-modal' uk-toggle='' >Open</a>

				<div id='data-modal' className='uk-flex-top' uk-modal=''>
					<div className='uk-modal-dialog uk-modal-body uk-margin-auto-vertical'>
						<button className='uk-modal-close-default' type='button' id='data-modal-close' uk-close=''></button>
						<div className='form-control'>
							<input onChange={this.onDataChange.bind(this)}
							value={this.props.form.data}
							onKeyDown={this.onDataKeyDown.bind(this)}
							id='data-model-input' className='uk-input' required='required'/>
							<label forhtml='data-model-input'>Data</label>
						</div>
					</div>
				</div>

				<a className='hidden' id='weight-modal-open' href='#weight-modal' uk-toggle='' >Open</a>
				<div id='weight-modal' className='uk-flex-top' uk-modal=''>
					<div className='uk-modal-dialog uk-modal-body uk-margin-auto-vertical'>
						<button className='uk-modal-close-default' type='button' id='weight-modal-close' uk-close=''></button>
						<div className='form-control'>
							<input onChange={this.onWeightChange.bind(this)}
							value={this.props.edgeForm.weight}
							onKeyDown={this.onWeightKeyDown.bind(this)}
							id='weight-modal-input' className='uk-input' required='required'/>
							<label forhtml='weight-modal-input'>Weight</label>
						</div>
					</div>
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
		edgeForm: store.EdgeReducer.form,
		weightList: store.EdgeReducer.weightList,
		previous: store.DijkstraReducer.previous
	}
}


export default withRouter(connect(mapStateToProps)(Menu));