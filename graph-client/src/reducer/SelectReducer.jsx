
const initState = {
	list: [],
}

export default function reducer(state = initState, action) {
	switch(action.type){

		case 'SR-updateList':{
			return{
				...state, list: action.payload,
			}
		}

		case 'SR-clearAll':{
			return {
				...state, list: [],
			}
		}

		default: {
			return state;
		}
	}
}