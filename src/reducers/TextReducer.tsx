import { State } from '../tsClasses'

const defineState = require('redux-localstore').defineState

const defaultState = new State()
const initialState = defineState(defaultState)('textReducer')

export default (state = initialState , action: any) => {
    switch (action.type) {
        case 'INCREMENT':
            action.payload(state)
            return {
                ...state,
            }

        case 'SET_MESSAGE':
            action.payload.setMessage(state,action.payload.message)
            return {
                ...state
            }
        
        case 'SAVE_MESSAGE':
            action.payload(state)
            return {
                ...state
            }
        
        case 'GET_TOP':
            return {
                ...state,
            }
        case 'REHYDRATE': 
            return {...state, ...action.payload.dataReducer}
        default:
            return {
                ...state,
            }
    }
}   