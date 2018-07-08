import { State } from '../tsClasses'

const defineState = require('redux-localstore').defineState

const defaultState = new State()
const initialState = defineState(defaultState)('textReducer')

export default (state = initialState , action: any) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            action.payload.setMessage(state,action.payload.message)
            console.log(state)
            return state
        
        case 'SAVE_MESSAGE':
            action.payload(state)
            return state

        default:
            return state
    }
}   