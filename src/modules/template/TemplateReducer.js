import { dropdownType } from '../dropdown/types'

const initialState = {
    updates: {
        gameState: {
            phase: dropdownType.pickPhase,
            counter1: dropdownType.pickUpdate,
            veto: dropdownType.pickUpdate,
            nominate: dropdownType.pickUid,
        },
        lobby: {
            dropdownType: dropdownType.pickUid,
            "/uid/": {
                name: dropdownType.pickUpdate,
                roleId: dropdownType.pickUpdate,
                dead: dropdownType.pickUpdate,
                health: dropdownType.pickUpdate,
            }
        },
        choice: dropdownType.pickUpdate,
        news: dropdownType.writeNews,
    },
}

export default (state = initialState, action) => {
    switch(action.type){
        default:
            return state;
    }
}