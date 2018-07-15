import { PageState } from '../tsClasses'
const defaultState = new PageState()

export default (state = defaultState , action: any) => {
    switch (action.type) {
        case 'TOGGLE_TIP_MENU':
            action.payload(state)
            return {
                ...state
            }
            
        default:
            return state
    }
}   