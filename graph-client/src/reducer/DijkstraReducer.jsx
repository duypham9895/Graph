const previous = [];
for(var i = 0; i < 100; i++){
	previous.push([]);
}
const initState = {
	shortestPath: [],
	previous: previous,

	simulation: {
		step: 1,
		source: -1,
		weight: [
			[0, 5, 3, Infinity, Infinity],
			[5, 0, 1, 2, 3],
			[3, 1, 0, 2, Infinity],
			[Infinity, 2, 2, 0, 5],
			[Infinity, 3, Infinity, 5, 0],
		],
		vertices: [
			{data: "A", top: 39, left: 50, selected: ""},
			{data: "B", top: 39, left: 350, selected: ""},
			{data: "C", top: 353, left: 50, selected: ""},
			{data: "D", top: 353, left: 350, selected: ""},
			{data: "E", top: 176, left: 550, selected: ""},
		],
		shortestPath: [],
		supSet: [],
		previous: [],
		selectedList:[],
		path: [[],[],[],[],[]],
		edge: [
			{index1: 0, top1: 39, left1: 50, index2: 2, top2: 353, left2: 50 ,weight: 3},
			{index1: 0, top1: 39, left1: 50, index2: 1, top2: 39, left2: 350,weight: 5},
			{index1: 2, top1: 353, left1: 50, index2: 1, top2: 39, left2: 350,weight: 1},
			{index1: 2, top1: 353, left1: 50, index2: 3, top2: 353, left2: 350,weight: 2},
			{index1: 3, top1: 353, left1: 350, index2: 1, top2: 39, left2: 350,weight: 2},
			{index1: 1, top1: 39, left1: 350, index2: 4, top2: 176, left2: 550,weight: 3},
			{index1: 3, top1: 353, left1: 350, index2: 4, top2: 176, left2: 550,weight: 5},
		],
		interval: null,
		speed: 600,
		
	},
};

export default function reducer(state = initState, action){
	const payload = action.payload;
	switch(action.type){

		case 'DR-updateShortestPathAndPrevious':{

			return{
				...state, shortestPath: payload.path, previous: payload.prev,
			}
		}

		case 'DR-updatePrevious':{
			return{
				...state, previous: payload,
			}
		}

		case 'DR-clearAll':{
			return {
				...state,
				shortestPath: [],
				previous: [],
			}
		}

		case 'DA-updateSimulationSelectedList':{
			return {
				...state,
				simulation:{
					...state.simulation,
					selectedList: payload,
				}
			}
		}

		case 'DA-updateSimulationVerticesList':{
			return {
				...state,
				simulation:{
					...state.simulation,
					vertices: payload,
				}
			}
		}

		case 'DR-updateSimulation':{
			return {
				...state, 
				simulation: payload
			}
		}

		case 'DA-updateStep': {
			return{
				...state,
				simulation: {
					...state.simulation,
					step: payload
				}
			}
		}

		case 'DA-updateSpeed': {
			return{
				...state,
				simulation: {
					...state.simulation,
					speed: payload
				}
			}
		}
		
		default: {
			return state;
		}
	}
}

