export const GET_DECKS = 'GET_DECKS'
export const GET_DECK = 'GET_DECK'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export function getDecks (decks) {
  return {
    type: GET_DECKS,
    decks
  }
}

export function addDeck (title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function addQuestion (title, question) {
  return {
    type: ADD_QUESTION,
    title,
    question
  }
}
