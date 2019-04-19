//ac: auto complete

const initState = {
	form:{
		from: '',
		to: '',
	},
	selectedList: [],
	acFromList: [],
	acToList: [],
	path: [],
	dist: '',
};

export default function reducer (state = initState, action){
	const payload = action.payload;
	switch(action.type){

		case 'SA-updateFormSearch':{
			return{
				...state,
				form: payload
			}
		}

		case 'SA-updateListACFrom':{
			return {
				...state, acFromList: payload
			}
		}

		case 'SA-updateListACTo':{
			return {
				...state, acToList: payload
			}
		}

		case 'SA-updateSelectedList':{
			return {
				...state,
				selectedList: payload
			}
		}

		case 'SA-updatePathAndDist':{
			return {
				...state, 
				path: payload.path,
				dist: payload.dist,
			}
		}

		default: {
			return state;
		}
	}
}