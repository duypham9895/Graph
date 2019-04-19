import React from 'react';
import { connect } from 'react-redux';

import { updateSimulationVerticesList, updateSimulationSelectedList, updateSimulation, updateStep, updateSpeed } from '../action/DijkstraAction.jsx';

class Simulation extends React.Component{

	selectVertex(index, vertex){
		if(this.props.simulation.interval !== null){
			return;
		}
		var list = [...this.props.simulation.vertices];
		var selectedList = [...this.props.simulation.selectedList];

		for( var i of selectedList.keys()){
			if(selectedList[i].index === index){
				selectedList.splice(i,1);
				list[index].selected = '';
				this.props.dispatch(updateSimulationSelectedList(selectedList));
				this.props.dispatch(updateSimulationVerticesList(list));
				this.props.dispatch(updateStep(1));
				return;
			}
		}

		list[index].selected = 'selected';
		selectedList.push({
			index: index,
			vertex: vertex,
		});

		this.props.dispatch(updateSimulationSelectedList(selectedList));
		this.props.dispatch(updateSimulationVerticesList(list));
		this.props.dispatch(updateStep(1));
	}

	nextStep(){
		this.props.dispatch(updateSimulation({ ...this.props.simulation }));
	}

	autoplay(){
		if(this.props.simulation.selectedList.length === 0 ){
			return;
		}
		console.log(this.props.simulation.speed);
		this.props.dispatch(updateSimulation({
			...this.props.simulation,
			interval: setInterval(() => {
				this.props.dispatch(updateSimulation({ ...this.props.simulation }));
			}, this.props.simulation.speed),
		}))
	}

	onRangeChange(event){
		console.log(event.target.value);
		this.props.dispatch(updateSpeed(parseInt(event.target.value) * 100));
	}

	pause(){
		clearInterval(this.props.simulation.interval);
		this.props.dispatch(updateSimulation({
			...this.props.simulation,
			interval: null,
		}))

	}

	render(){
		const edges = this.props.simulation.edge;
		const list = this.props.simulation.vertices;
		const shortestPath = this.props.simulation.shortestPath;
		const previous = this.props.simulation.previous;
		const supSet = this.props.simulation.supSet;
		const path = this.props.simulation.path;

		return(
			<div>
				<div className='menu'
				uk-sticky='animation: uk-animation-slide-top'>
					<div onClick={this.nextStep.bind(this)}>
						<i className='fas fa-forward'></i> Next Step
					</div>

					<div>
						<input type='range' min='5' max='10' step='1' value={this.props.simulation.speed/100}
						onChange={this.onRangeChange.bind(this)}/> {this.props.simulation.speed/10}
					</div>

					<div onClick={this.autoplay.bind(this)}>
						<i className='fas fa-play'></i> Autoplay
					</div>

					<div onClick={this.pause.bind(this)}>
						<i className='fas fa-pause'></i> Pause
					</div>


				</div>

				<div className='uk-grid-collapse' uk-grid=''>
					<div className='uk-width-2-5 panel-simulation' id='panel'>
						{
							list.map((vertex, index) => {
								return(
									<div onDoubleClick={this.selectVertex.bind(this, index, vertex)} key={index} className={'node '+ vertex.selected+'-simulation'} style={{top: vertex.top, left: vertex.left}}>
										<div className='vertex'>
											{vertex.data}
										</div>
									</div>
								)
							})
						}
						<svg className='svg' style={{height: '100%', width: '100%' }}>
							{
								edges.map((e, index) => {
									return (
										<line className={'svg-line-simulation ' + e.highlight} key={index} x1={ e.left1 } y1={ e.top1 } x2={ e.left2 } y2={ e.top2 }  ></line>
									)
								})
							}
							{
								edges.map((e, index) => {
									return (
										<text key={index} x={ ((e.left1 + e.left2)/2)} y={ ((e.top1+e.top2)/2)}>{e.weight}</text>
									)
								})
							}
						</svg>
					</div>

					<div className='uk-width-3-5'>
						<table className='uk-table'>
							<thead>
								<tr>
									<th className='uk-width-small'>Vertex</th>
									<th className='uk-width-small'>Visited</th>
									<th className='uk-width-small'>Distance</th>
									<th className='uk-width-small'>Previous</th>
								</tr>
							</thead>

							<tbody>
									{
										list.map((vertex, indexList) => {
											return(
												<tr key={indexList} className={supSet[indexList] ? 'visited' : ''}>
													<td>{vertex.data}</td>
													<td>{supSet[indexList] !== undefined ? ''+supSet[indexList] : null}</td>
													<td>{shortestPath[indexList]}</td>
													<td>{previous[indexList]}</td>
												</tr>
											)
										})
									}
							</tbody>
						</table>
					</div>
				</div>
				<div>
					<table className='uk-table'>
						<thead>
							<tr>
								<th className='uk-width-small'>Vertex</th>
								<th>Path</th>
							</tr>
						</thead>

						<tbody>
								{
									list.map((vertex, indexList) => {
										return(
											<tr key={indexList}>
												<td>{vertex.data}</td>
												<td>{
													path[indexList].map((p, index) => {
														if (index === path[indexList].length - 1){
															return p;
														} 
														return p + "->";
													})
												}</td>
											</tr>
										)
									})
								}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (store) => {
	return {
		simulation: store.DijkstraReducer.simulation,
	}
}

export default connect(mapStateToProps)(Simulation);