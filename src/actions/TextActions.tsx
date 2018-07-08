import { State, LinkedList } from '../tsClasses'

const setMessage = (state: State, message: string) => {
    state.message = message
}

const saveMessage = (state: State) => {
    state.text = new LinkedList(state.message.split('\n'))
}

export const setMessageAction = (message: string) => ({
        payload: {
            message,
            setMessage,
        },
        type: 'SET_MESSAGE',
})

export const saveMessageAction = () => ({
        payload: saveMessage,
        type: 'SAVE_MESSAGE'
})