// const list = [
// 	{data: "a", top: 100, left: 100, selected: ""},
// 	{data: "b", top: 87.0085220336914, left: 438, selected: ""},
// 	{data: "c", top: 164.0085220336914, left: 652, selected: ""},
// 	{data: "d", top: 307.0085220336914, left: 146, selected: ""},
// 	{data: "e", top: 314.0085220336914, left: 463, selected: ""},

const initState = {
	list: [],
	form: {
		data: '',
		message: '',
		action: '',
	},
}

export default function reducer(state = initState, action) {
	switch(action.type){

		case 'updateForm':{
			return {
				...state, form: action.payload,
			}
		}

		case 'VT-updateList':{
			return {
				...state, list: action.payload,
			}
		}

		case 'VT-clearAll':{
			return {
				...state, list: [],
						form: {
							data: '',
							message: '',
							action: '',
						},
			}
		}

		default: {
			return state;
		}
	}
}