import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createAppContainer } from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import { createStackNavigator} from 'react-navigation-stack'
import { FontAwesome } from '@expo/vector-icons';
import DeckList from './components/DeckList.js'
import Deck from './components/Deck.js';
import AddCard from './components/AddCard.js'
import AddDecks from './components/AddDeck.js';
import Quiz from './components/Quiz.js'
import { setLocalNotifyMe } from './utils/helpers';


const Tab = createBottomTabNavigator({
  Home: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: () => <FontAwesome name='cubes' size={55} color="white" />
    }, 
    
  },
  AddDecks: {
    screen: AddDecks,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: () => <FontAwesome name='plus-square' size={60} color="white" />
    }, 
    
  }
},
{
  tabBarOptions: {
    style: {
      height: 80,
      backgroundColor: '#F5AC72',
    }
  }
}
);

const Navigator = createStackNavigator({
  Home: {
    screen: Tab,
    navigationOptions: {
      headerBackground: (<FontAwesome color='#F5AC72' name='cubes' size={50} style={{justifyContent: 'center',
      alignSelf: 'center', paddingTop:50}}/>),
      title: 'Cardie',
      headerStyle: {
        backgroundColor: 'white',
        height:100,
         shadowRadius: 5,
      shadowOpacity: 1,
      paddingTop: 90
      }
    }
  },
  
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerBackground: (<FontAwesome color='#F5AC72' name='cubes' size={50} style={{justifyContent: 'center',
      alignSelf: 'center', paddingTop:50}}/>),
      headerStyle: {
        backgroundColor: '#F5AC72',
        height:100
      }
    }
  },

  DeckList: {
    screen: DeckList,
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerBackground: (<FontAwesome color='#F5AC72' name='cubes' size={50} style={{justifyContent: 'center',
      alignSelf: 'center', paddingTop:50}}/>),
      headerStyle: {
        backgroundColor: '#F5AC72',
        height:100
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerBackground: (<FontAwesome color='#F5AC72' name='cubes' size={50} style={{justifyContent: 'center',
      alignSelf: 'center', paddingTop:50}}/>),
      headerStyle: {
        backgroundColor: '#F5AC72',
        height:100
      }
    }
  },
},
  {
    headerMode: 'screen'
  }
  )


const Nav = createAppContainer(Navigator)


export default class App extends Component {
  componentDidMount() {
    setLocalNotifyMe()
}

render()  {
  return (
    <Provider store={createStore(reducer)}>
    <View style={styles.container}>
      <Nav style={styles.navigation}/>
    </View>
    </Provider>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',

  },
  color: {
    color:'white'
  }
});
