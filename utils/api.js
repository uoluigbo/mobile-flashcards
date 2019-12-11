import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'MobileFlashcard:decks'


export function getDecks() {
    return AsyncStorage.getItem(STORAGE_KEY)
        .then((decks) => JSON.parse(decks))
}

export function getDeck(title) {
    return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
        const data = JSON.parse(results)
        
        let deck = {}

        for( let k in data ) {
            if(data[k]['title'] === title) {
                deck = data[k]
            }
        }
            
         return deck
    })
}

export function saveDeck(deck) {

    return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
        [deck.id]: deck
    }))
}

export function saveCardToDeck(id, card) {
    
    return AsyncStorage.getItem(STORAGE_KEY)
     .then((results) => {
        const data = JSON.parse(results)

         AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
             [id]: {
                questions: data[id]['questions'].concat(card)
            }
        }))
     })
}

export function removeDeck(id) {
    return AsyncStorage.getItem(STORAGE_KEY)
     .then((results) => {
         const data = JSON.parse(results)
         data[id] = undefined
         delete data[id]
         AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
     })
}