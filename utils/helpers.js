import { AsyncStorage } from 'react-native';
import { DATA } from './_DATA'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const KEY = 'decks'
export const getDecks = () => {
    return AsyncStorage.getItem(KEY)
    .then((decks) => {
      return decks === null ? addDecks() : JSON.parse(decks)
    }
    )
} 

export const getDeck = (id) => {
    return AsyncStorage.getItem(KEY)
        .then((decks) => {
            JSON.parse(decks)
            return decks[id] 
        })
           
}

export const saveDeckTitle = (title) => {
return  AsyncStorage.mergeItem(KEY, JSON.stringify({
    [title]: {title: title, questions: []}
  }))
}

export const addCardToDeck = (title, card) => {
    return  AsyncStorage.mergeItem(KEY, JSON.stringify({
        [title]: {questions: card}
      }))
}

export const clearAsyncStorage = async() => {
    AsyncStorage.clear();
}

addDecks = () =>  {
    AsyncStorage.setItem(KEY, JSON.stringify(DATA))
    return DATA
  }
  

// export let random = function () { 
//     let text = "";
//     const possible = "ABCDEF0123456789";
//     for (var i = 0; i < 6; i++)
//     text += possible.charAt(Math.floor(Math.random() * possible.length).toString(16));
//     return '#' + text
//   }

  

const notifyMe = () => {
    return {
        title: 'Time to take a quiz!',
        body: 'Study shows that a quiz a day can help with memory retention',
        ios:{
            sound:true
        }
    }
}  

export const setLocalNotifyMe = () => {
    notifyMe()
    AsyncStorage.getItem('studyKey')
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(23)
              tomorrow.setMinutes(30)

              Notifications.scheduleLocalNotificationAsync(
                notifyMe(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem('studyKey', JSON.stringify(true))
            }
          })
      }
    })
}

export const clearNotifyMe = () => {
    return AsyncStorage.removeItem('studyKey')
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}