import { PageState } from '../tsClasses'

const toggleTipMenu = (state: PageState) => {
    localStorage.PageState = JSON.stringify({
        ...state,
        tipMenuVisible: !state.tipMenuVisible
    })
}

export const toggleTipMenuAction = () => ({
  type: 'TOGGLE_TIP_MENU',
  payload: toggleTipMenu
})

export const setText = (message: string) => {
    return (dispatch: any, getState: PageState) => {
        dispatch(toggleTipMenuAction())
    }
}