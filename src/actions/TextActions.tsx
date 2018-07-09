import { State, LinkedList } from '../tsClasses'

const saveLinkedListInState = (state: State) => {
    state.text = new LinkedList(state.message.split('\n'))
}

const saveMessageInState = (state: State, message: string) => {
    state.message = message
    localStorage.message = JSON.stringify(message.split('\n'))
}

const setMessageAction = (message: string) => {
    return {
        payload: {
            message,
            setMessage: saveMessageInState
        },
        type: 'SET_MESSAGE',
    };
}

const saveMessageAction = (message: string) => {
    return {
        payload: saveLinkedListInState,
        type: 'SAVE_MESSAGE'
    };
}

export const setMessage = (message: string) => {
    return (dispatch: any, getState: any) => {
        dispatch(setMessageAction(message))
        dispatch(saveMessageAction(getState().textReducer.message))
    }
}

export const saveMessage = () => {
    return (dispatch: any, getState: any) => {
        dispatch(saveMessageAction(getState().textReducer.message))
    }
}