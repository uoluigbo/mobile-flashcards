import {
    RECEIVE_DECKS,
    ADD_DECK,
    ADD_CARD_TO_DECK,
    REMOVE_DECK
} from '../actions/'

function decks (state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            return {
                ...state,
                [action.deck.id]: action.deck
            }
        case ADD_CARD_TO_DECK:
            
            const deck = state[action.id]

            return {
                ...state,
                [action.id]: {
                    ...deck,
                    'questions': deck['questions'].concat(action.card)
                }
            }
        case REMOVE_DECK:
            state[action.id] = undefined
            delete state[action.id]

            return {
                ...state
            }
        default:
            return state
    }
}

export default decks