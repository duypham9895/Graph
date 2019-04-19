export function updateFormSearch(form){
	return function (dispatch) {
		dispatch({
			type: 'SA-updateFormSearch',
			payload: form,
		})
	}
}

export function updateListACFrom(list){
	return function (dispatch) {
		dispatch({
			type: 'SA-updateListACFrom',
			payload: list,
		})
	}
}

export function updateListACTo(list){
	return function (dispatch) {
		dispatch({
			type: 'SA-updateListACTo',
			payload: list,
		})
	}
}

export function updateSelectedList(list){
	return function (dispatch) {
		dispatch({
			type: 'SA-updateSelectedList',
			payload: list
		})
	}
}

export function updatePathAndDist(path, dist){
	return function (dispatch){
		dispatch({
			type: 'SA-updatePathAndDist',
			payload: {
				path: path,
				dist: dist,
			}
		})
	}
}