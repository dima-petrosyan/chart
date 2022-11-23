import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { RootStateType } from './store'
import { tasksAPI } from '../DAL/tasksAPI'

const SET_TASKS = 'SET-TASKS'

type ITask = {
	id: number
	title: string
	period_start: string
	period_end: string
	sub?: Array<ITask>
}

const initialState = {
	project: null as string | null,
	period: null as string | null,
	chart: null as ITask | null,
}

type InitialStateType = typeof initialState

const tasksReducer = (state = initialState, action: Action): InitialStateType  => {
	switch (action.type) {
		case 'SET-TASKS': 
			return {
				...state,
				...action.payload
			}
		default: 
			return state
	}
}

type Action = {
	type: typeof SET_TASKS,
	payload: InitialStateType
}

const setTasks = (payload: InitialStateType): Action => {
	return {
		type: SET_TASKS,
		payload
	}
}

type ThunkType = ThunkAction<void, RootStateType, unknown, Action>

export const getTasks = (): ThunkType => {
	return (dispatch: Dispatch<Action>) => {
		tasksAPI.getTasks()
			.then((data: any) => dispatch(setTasks(data)))
	}
}

export default tasksReducer
















