import { combineReducers, createStore, applyMiddleware } from 'redux';
import tasksReducer from './tasksReducer'
import thunkMiddleware from 'redux-thunk'
import { useSelector, TypedUseSelectorHook } from 'react-redux'

const rootReducer = combineReducers({
	tasks: tasksReducer,
})

export type RootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export const useTypedSelector: TypedUseSelectorHook<RootStateType> = useSelector
