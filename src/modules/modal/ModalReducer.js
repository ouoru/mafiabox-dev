import * as helpers from '../common/helpers'
import { modalType } from './types';

const initialState = {
    modalKeys: [],
}

const UPDATE_MODAL_KEYS = 'modal/update-modal-keys'

export function showModal(key, params={}) {
    return (dispatch, getState) => {
        const { modalKeys } = getState().modal
        const { dropdownKeys } = getState().dropdown

        let keysClone = Array.from(modalKeys)

        if (!key) {
            keysClone.pop()
        } else {
            const _params = {}
            switch(key) {
                case modalType.editEvent:
                case modalType.editTrigger:
                case modalType.editToast:
                    _params._attach = params.attach
                    break
                default:
            }
            
            keysClone.push({
                ...keysClone[keysClone.length - 1],
                ...dropdownKeys[dropdownKeys.length - 1],
                ...params,
                ..._params,
                key,
            })
        }
        
        dispatch({
            type: UPDATE_MODAL_KEYS,
            payload: keysClone
        })
    }
}

export function popModalTo(index) {
    return (dispatch, getState) => {
        const { modalKeys } = getState().modal

        const keysClone = Array.from(modalKeys).slice(0, index + 1)

        dispatch({
            type: UPDATE_MODAL_KEYS,
            payload: keysClone,
        })
    }
}

export function updateTopModal() {
    return (dispatch, getState) => {
        if (!arguments[0]) return
        const { modalKeys } = getState().modal

        let keysClone = Array.from(modalKeys)
        keysClone[keysClone.length - 1][arguments[0]] = helpers.pathUpdate(arguments, 0, keysClone[keysClone.length - 1])
        
        dispatch({
            type: UPDATE_MODAL_KEYS,
            payload: keysClone
        })
    }
}

export default (state = initialState, action) => {
    switch(action.type){
        case UPDATE_MODAL_KEYS:
            return { ...state, modalKeys: action.payload }
        default:
            return state;
    }
}