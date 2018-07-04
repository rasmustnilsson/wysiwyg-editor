import { State, LinkedList } from '../tsClasses'

const setMessage = (state: State, message: string) => {
    state.message = message
}

const saveMessage = (state: State) => {
    state.text =  new LinkedList(state.message.split('\n'))
}

export const getTopAction = () => {
    return {
        type: 'GET_TOP'
    }
}

export const setMessageAction = (value: string) => {
    return {
        payload: {
            message: value,
            setMessage,
        },
        type: 'SET_MESSAGE',
    }
}

export const saveMessageAction = () => {
    return {
        payload: saveMessage,
        type: 'SAVE_MESSAGE'
    }
}