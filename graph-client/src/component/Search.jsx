import React from 'react';
import {connect} from 'react-redux';

import { updateEdgeList } from '../action/EdgeAction.jsx';
import { updateShortestPathAndPrevious } from '../action/DijkstraAction.jsx';
import { updateList as updateVertexList } from '../action/VertexAction.jsx';
import { updateList as updateSelectedList } from '../action/SelectAction.jsx';
import { updateFormSearch, updateListACFrom, updateListACTo, updateSelectedList as updateSelectedListSearch, updatePathAndDist } from '../action/SearchAction.jsx';

class Search extends React.Component{

	inputChange(e){
		const name = e.target.name;
		const value = e.target.value;
		const listVertex = this.props.listVertex;
		var form = {...this.props.form};

		if(value.length === 0){
			this.props.dispatch(updateListACFrom([]));
			this.props.dispatch(updateListACTo([]))
			if(name === 'from'){
				form.from = '';
				this.props.dispatch(updateFormSearch(form));
			} else {
				form.to = '';
				this.props.dispatch(updateFormSearch(form));
			}
			return;
		}

		var list = [];
		var data;
		for(var i of listVertex.keys()){
			data = '' + listVertex[i].data;
			if(data.includes(value)){
				list.push({
					index: i,
					vertex: listVertex[i],
				})
			}
		}

		const newForm = {...this.props.form,
						[e.target.name]: e.target.value};
		this.props.dispatch(updateFormSearch(newForm));

		if( name === 'from'){
			this.props.dispatch(updateListACFrom(list));
			this.props.dispatch(updateListACTo([]))
		} else {
			this.props.dispatch(updateListACFrom([]));
			this.props.dispatch(updateListACTo(list))
		}
	}

	select(v, fromto){
		var listSelectedSearch = [...this.props.listSelectedSearch];
		var form = {...this.props.form};
		var graph = this.props.weightList;
		var vertices = this.props.listVertex;

		if(fromto === 'from') {
			listSelectedSearch[0] = v;
			form.from = v.vertex.data
			this.props.dispatch(updateFormSearch(form));
			this.props.dispatch(updateShortestPathAndPrevious(v.index, graph, vertices));
		}

		if(fromto === 'to') {
			listSelectedSearch[1] = v;
			form.to = v.vertex.data
			this.props.dispatch(updateFormSearch(form));
		}

		this.props.dispatch(updateSelectedListSearch(listSelectedSearch));
		this.props.dispatch(updateListACFrom([]));
		this.props.dispatch(updateListACTo([]));
	}

	findPath(){
		const listSelectedSearch = this.props.listSelectedSearch;
		var listVertex = [...this.props.listVertex];

		for( var v of listVertex){
			v.selected = '';
		}

		this.props.dispatch(updateVertexList(listVertex));

		listVertex[listSelectedSearch[0].index].selected = 'selected';
		this.props.dispatch(updateSelectedList(listSelectedSearch));
		this.props.dispatch(updateVertexList(listVertex));

		const shortestPath = this.props.shortestPath;
		const previous = this.props.previous;

		this.props.dispatch(updatePathAndDist(previous[listSelectedSearch[1].index], shortestPath[listSelectedSearch[1].index]))
		// console.log(previous[listSelectedSearch[1].index]);
	}

	path(index){
		const props = this.props;
		var list = [...props.listVertex];
		var selectedList = [...props.listSelected];
		var arrPathSelected = props.pathSearch;
		var newSelectedList = [];
		var edgeList = [...props.edgeList];

		if(arrPathSelected.length < 1){
			return;
		}

		var index1, index2;
		var vertexIndexList = [];

		for(var v of list){
			v.selected = '';
			vertexIndexList.push(v.data);
		}

		for(var e of edgeList){
			e.highlight = '';
		}
		
		for(var i = 0; i < arrPathSelected.length; i++ ){
			index = vertexIndexList.indexOf(arrPathSelected[i]);

			index1 = vertexIndexList.indexOf(arrPathSelected[i]);
			index2 = vertexIndexList.indexOf(arrPathSelected[i+1]);

			for(var j = 0; j < edgeList.length; j++){
				if( (edgeList[j].index1 === index1 && edgeList[j].index2===index2) || (edgeList[j].index1 === index2 && edgeList[j].index2===index1 ) ){
					edgeList[j].highlight = 'highlight';
					break;
				}
			}

			list[index].selected = 'selected';
			newSelectedList.push({
				index: index,
				vertex: list[index],
			})
		}
		selectedList = newSelectedList;

		this.props.dispatch(updateEdgeList(edgeList));
		this.props.dispatch(updateSelectedList(selectedList));
		this.props.dispatch(updateVertexList(list));
	}

	render(){
		const autoCompleteFrom = this.props.acFromList;
		const autoCompleteTo = this.props.acToList;
		const pathSearch = this.props.pathSearch;
		const distSearch = this.props.distSearch;
		// const previous = this.props.previous;
		return(
			<div >
				<div id='modal-search' className='custom-modal' aria-hidden='true' hidden={true}>
					<div className='uk-margin-auto-vertical'>
						<div className='form-control form-control-search'>
							<input onChange={this.inputChange.bind(this)}
							value={this.props.form.from}
							id='data-model-input from' name='from' className='uk-input input-search' required='required'/>
							<label forhtml='data-model-input'>From</label>
							<div className='dropdown' >
								{
									autoCompleteFrom.map( (v, index) => {
										return(
											<div onClick={this.select.bind(this, v, 'from')} key={index} >{v.vertex.data}</div>
										)
									})
								}
							</div>
						</div>

						<div className='form-control form-control-search'>
							<input onChange={this.inputChange.bind(this)}
							value = {this.props.form.to}
							id='data-model-input to' name='to' className='uk-input' required='required'/>
							<label forhtml='data-model-input'>To</label>
							<div className='dropdown'>
								{
									autoCompleteTo.map( (v, index) => {
										return(
											<div onClick={this.select.bind(this, v, 'to')} key={index} >{v.vertex.data}</div>
										)
									})
								}
							</div>
						</div>
						<div>
							<button className='uk-button uk-button-large uk-button-primary button-go' onClick={this.findPath.bind(this)}>GO</button>
						</div>

						<div className=''>
							<table className='uk-table search-table'>
								<thead>
									<tr>
										<th>Distance</th>
										<th>Shortest Path</th>
									</tr>
								</thead>
								<tbody onClick={this.path.bind(this)}>
									<tr>
										<td>{distSearch}</td>
										<td>
											{
												pathSearch.map((way, index) => {
													if (index === pathSearch.length - 1){
														return way;
													} 
													return way + "->";
												})
											}
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (store) => {
	return {
		weightList: store.EdgeReducer.weightList,
		listVertex: store.VertexReducer.list,
		listSelected: store.SelectReducer.list,
		form: store.SearchReducer.form,
		acFromList: store.SearchReducer.acFromList,
		acToList: store.SearchReducer.acToList,
		listSelectedSearch: store.SearchReducer.selectedList,
		shortestPath: store.DijkstraReducer.shortestPath,
		previous: store.DijkstraReducer.previous,
		edgeForm: store.EdgeReducer.form,
		edgeList: store.EdgeReducer.list,
		pathSearch: store.SearchReducer.path,
		distSearch: store.SearchReducer.dist,
	}
}

export default connect(mapStateToProps)(Search);