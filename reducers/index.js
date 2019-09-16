import { GET_DECKS,
         ADD_DECK,
         ADD_QUESTION } from '../actions'

function decks (state = {}, action) {

  switch (action.type) {
    case GET_DECKS :
      return {
        ...action.decks
      }

    case ADD_DECK :
      return {
        ...state,
          [action.title]: {
            title:action.title,
            questions: []
          }
      }

    case ADD_QUESTION :
      return {
        ...state,
          [action.title]: {
            ...state[action.title],
            questions: [...state[action.title].questions, action.question]
          }
      }

    default :
      return state
  }
}

export default decks
