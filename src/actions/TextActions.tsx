import { State, LinkedList } from '../tsClasses'

const textToLinkedList = (state: State) => {
    state.text = new LinkedList(state.message.split('\n'))
}

const saveTextInState = (state: State, message: string) => {
    state.message = message
    console.log(JSON.stringify(message))
    localStorage.message = JSON.stringify(message.split('\n'))
}

const setTextAction = (message: string) => {
    return {
        payload: {
            message,
            setMessage: saveTextInState
        },
        type: 'SET_MESSAGE',
    }
}

const textToLinkedListAction = (message: string) => {
    return {
        payload: textToLinkedList,
        type: 'SAVE_MESSAGE'
    }
}

export const setText = (message: string) => {
    return (dispatch: any, getState: any) => {
        dispatch(setTextAction(message))
        dispatch(textToLinkedListAction(getState().textReducer.message))
    }
}