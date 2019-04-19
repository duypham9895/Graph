export function updateList(list){
	return function (dispatch){
		dispatch({
			type: 'SR-updateList',
			payload: list,
		})
	}
}

export function clearAll(){
	return function (dispatch){
		dispatch({
			type: 'SR-clearAll',
		})
	}
}