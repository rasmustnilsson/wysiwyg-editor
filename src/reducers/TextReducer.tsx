import { State } from '../tsClasses'
const defaultState = new State()

export default (state = defaultState , action: any) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            action.payload.setMessage(state,action.payload.message)
            return state
        
        case 'SAVE_MESSAGE':
            action.payload(state)
            return state
        
        default:
            return state
    }
}   