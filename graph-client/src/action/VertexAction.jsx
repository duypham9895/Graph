export function updateForm(form){
	return function (dispatch){
		dispatch({
			type: 'updateForm',
			payload: form,
		})
	}
}

export function updateList(list){
	return function (dispatch){
		dispatch({
			type: 'VT-updateList',
			payload: list,
		})
	}
}

export function clearAll(){
	return function (dispatch){
		dispatch({
			type: 'VT-clearAll',
		})
	}
}