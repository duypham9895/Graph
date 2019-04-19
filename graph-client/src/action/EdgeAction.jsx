export function updateEdgeList(list){
	return function (dispatch){
		dispatch({
			type: 'ER-updateList',
			payload: list,
		})
	}
}

export function updateEdgeForm(form){
	return function (dispatch){
		dispatch({
			type: 'ER-updateForm',
			payload: form,
		})
	}
}

export function updateWeightList(list){
	return function (dispatch){
		dispatch({
			type: 'ER-updateWeightList',
			payload: list,
		})
	}
}

export function updateFlag(){
	return function (dispatch){
		dispatch({
			type: 'ER-updateFlag',
		})
	}
}

export function clearEdgeForm(){
	return function (dispatch){
		dispatch({
			type: 'ER-clearEdgeForm'
		})
	}
}

export function clearAll(){
	return function (dispatch){
		dispatch({
			type: 'ER-clearAll'
		})
	}
}