export function updateShortestPathAndPrevious(source, graph, vertices){
	return function (dispatch) {
		const I = Infinity;

		const minDistance = (dist, sptSet, num) => {
			var min = I;
			var min_index = -1, vertex;
			for (vertex = 0; vertex < num; vertex++){
				if(sptSet[vertex] === false && dist[vertex] <= min){
					min = dist[vertex];
					min_index = vertex;
				}
			}
			return min_index;
		}
		if(source < 0){
			return;
		}

		// var graph = this.props.weightList;
		// var source = this.props.selectedList[0].index;
		// var vertices = this.props.list;

		var num = vertices.length;
		var dist = [];
		var sptSet = [];
		var previous = [];
		
		for(var i = 0; i < num; i++){
			dist[i] = I;
			sptSet[i] = false;
			previous.push(null);
		}

		dist[source] = 0;

		for (i = 0; i < num; i++){
			var u = minDistance(dist, sptSet, num);
			for(var v = 0; v < num; v++){
				if( !sptSet[v] && (graph[u][v] !== 0 && graph[u][v] !== I) && ((dist[u] + graph[u][v]) < dist[v]) ){
					dist[v] = dist[u] + graph[u][v];
					previous[v] = vertices[u].data;
				}
			}
			sptSet[u] = true;
		}


		var data = vertices.map((v)=>{
			return v.data;
		});

		var result = [];
		for(i = 0; i < previous.length; i++){
			var temp = previous[i];
			result.push([]);
			while(temp !== null){
				result[i].push(temp);
				temp = previous[data.indexOf(temp)];
			}
			result[i].reverse();
			result[i].push(data[i]);
		}

		dispatch({
			type: 'DR-updateShortestPathAndPrevious',
			payload: {
				path: dist,
				prev: result,
			}
		})
	}

}

export function updatePrevious(prev){
	return function (dispatch){
		dispatch({
			type: 'DR-updatePrevious',
			payload: prev,
		})
	}
}

export function clearAll(){
	return function (dispatch){
		dispatch({
			type: 'DR-clearAll',
		})
	}
}

export function updateSimulationSelectedList(list){
	return function (dispatch){
		dispatch({
			type: 'DA-updateSimulationSelectedList',
			payload: list,
		})
	}
}

export function updateSimulationVerticesList(list){
	return function (dispatch){
		dispatch({
			type: 'DA-updateSimulationVerticesList',
			payload: list,
		})
	}
}

export function updateStep(step){
	return function (dispatch){
		dispatch({
			type: 'DA-updateStep',
			payload: step,
		})
	}
}

export function updateSpeed(speed){
	return function (dispatch){
		dispatch({
			type: 'DA-updateSpeed',
			payload: speed,
		})
	}
}


export function updateSimulation(simulation){
	return function (dispatch){
		var { step, source, weight, vertices, shortestPath, supSet, previous, selectedList, path, edge } = simulation;
		// console.log(step, source, weight, vertices, shortestPath, supSet, previous);
		const I = Infinity;
		switch(step){
			case 1 : {
				shortestPath = [];
				supSet = [];
				previous = [];
				path = [];

				for(var v of vertices){
					shortestPath.push(I);
					supSet.push(false);
					previous.push(null);
					path.push([]); 
					v.selected = '';
				}

				vertices[selectedList[0].index].selected = 'selected';
				shortestPath[selectedList[0].index] = 0;

				simulation.vertices = vertices;
				simulation.source = selectedList[0].index;
				simulation.shortestPath = shortestPath;
				simulation.supSet = supSet;
				simulation.previous = previous;
				simulation.step = 3;
				simulation.path = path;

				dispatch({
					type: 'DR-updateSimulation',
					payload: simulation,
				});

				break;
			}

			case 2 : {
				var min = I;
				var min_index = -1;
				for( var i of vertices.keys()){
					if(vertices[i].selected === 'neighbor'){
						vertices[i].selected = '';
					}
					if( supSet[i] === false && shortestPath[i] < min ){
						min = shortestPath[i];
						min_index = i;
					}
				}

				// for(var e of edge){
				// 	e.highlight = '';
				// 	if(e[source])
				// }

				if(min_index === -1){
					simulation.source = -1;
					simulation.step = 5;
				} else {
					vertices[min_index].selected = 'selected';
					simulation.vertices = vertices;
					simulation.source = min_index;
					simulation.step = 3;
				}

				dispatch({
					type: 'DR-updateSimulation',
					payload: simulation,
				});

				break;
			}

			case 3 : {
				var neighbor = [];

				for(i of vertices.keys()){
					if(!supSet[i] && (weight[source][i] !== 0 && weight[source][i] !== I)) {
						vertices[i].selected = 'neighbor';
						neighbor.push(i);
						if((shortestPath[source] + weight[source][i] < shortestPath[i] )){
							shortestPath[i] = shortestPath[source] + weight[source][i];
							previous[i] = vertices[source].data;
							vertices[i].selected = 'neighbor';
						}
					}
				}

				for(var e of edge){
					e.highlight = '';
					
					if( (e.index1 === source && neighbor.indexOf(e.index2) !== -1) || 
						(e.index2 === source && neighbor.indexOf(e.index1) !== -1) ){
						e.highlight = 'highlight';
					}
				}
				// shortestPath, previous, 
				simulation.edge = edge;
				simulation.vertices = vertices;
				simulation.shortestPath = shortestPath;
				simulation.previous = previous;
				simulation.step = 4;

				dispatch({
					type: 'DR-updateSimulation',
					payload: simulation,
				});
				break;
			}

			case 4 : {
				simulation.supSet[source] = true;
				simulation.step = 2;
				simulation.vertices[source].selected = 'selected';
				dispatch({
					type: 'DR-updateSimulation',
					payload: simulation,
				});
				break;
			}

			case 5 : {
				var data = vertices.map((v)=>{
					return v.data;
				});

				var result = path;
				for(i = 0; i < previous.length; i++){
					var temp = previous[i];

					while(temp !== null){
						result[i].push(temp);
						temp = previous[data.indexOf(temp)];
					}
					result[i].reverse();
					result[i].push(data[i]);
				}
				simulation.path = result;
				simulation.step = -1;
				clearInterval(simulation.interval);
				simulation.interval = null;
				dispatch({
					type: 'DR-updateSimulation',
					payload: simulation,
				});
				break;
			}


			default : {
				return;
			}
		}
	}
}