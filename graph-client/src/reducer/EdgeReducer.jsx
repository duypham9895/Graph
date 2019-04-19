const initState = {
	list:[],
	form:{
		action: '',
		weight: '',
		message: '',
		listVertex: [],
	},
	weightList: [],
	
}

export default function reducer(state = initState, action){
	switch(action.type){

		case 'ER-updateList':{
			return {
				...state, list: action.payload,
			}
		}

		case 'ER-updateForm':{
			return {
				...state, form: action.payload,
			}
		}

		case 'ER-updateWeightList':{
			return {
				...state, weightList: action.payload,
			}
		}

		case 'ER-clearEdgeForm':{
			return {
				...state, form:{
					action: '',
					weight: '',
					message: '',
					listVertex: [],
				},
			}
		}

		case 'ER-clearAll':{
			return {
				...state, list:[],
						form:{
							action: '',
							weight: '',
							message: '',
						},
						weightList: [],
			}
		}
		
		default: {
			return state;
		}
	}
}