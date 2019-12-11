export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
import { saveCardToDeck, saveDeck, removeDeck } from '../utils/api'

export function receiveDecks (decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function addDeck (deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

function deleteDeck (id) {
    return {
        type: REMOVE_DECK,
        id
    }
}

function addCardToDeck (id, card) {
    return {
        type: ADD_CARD_TO_DECK,
        id,
        card
    }
}

export function handleAddDeck (title) {
    return (dispatch) => {
        const id = title.replace(title, ' ')
        const deck = {
            id: title.replace(' ', ''),
            title: title,
            questions: []
        }

        dispatch(addDeck(deck))

        return saveDeck(deck)
         .catch(() => {
            dispatch(deleteDeck(deck.id))
            console.log('Error Adding Deck. Try Again.')
        })
    }
}

export function handleAddCardToDeck (deckId, question, answer) {
    const card = {
        question: question,
        answer: answer
    }

    return (dispatch) => {
        
        
        return (
            saveCardToDeck(deckId, card)
            .then(() => dispatch(addCardToDeck(deckId, card)))
        )
    }
}

export function handlRemoveDeck (deck) {
    return (dispatch) => {
        dispatch(deleteDeck(deck.id))

        return removeDeck(deck.id)
         .catch(() => {
            dispatch(addDeck(deck))
            console.log('Error Deleting Deck. Try Again.')
         })
    }
}

