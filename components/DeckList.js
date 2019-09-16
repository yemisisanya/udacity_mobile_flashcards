import React, {Component} from 'react';
import { getDecks, clearAsyncStorage } from '../utils/helpers';
import { connect } from 'react-redux'
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
 } from 'react-native';
 import { getDecks as gDecks }  from '../actions'


class DeckList extends Component {

componentDidMount() {
  clearAsyncStorage()
getDecks().then((decks) => this.props.dispatch(gDecks(decks)));
  }

  renderList = ({item}) => {
     return (
     <TouchableOpacity
      onPress={() => this.props.navigation.navigate(
        'Deck',
        { deck: item.deck, id: item.key }
    )}>
        <View style={[styles.decks, {backgroundColor:'#E8E8E6'}]}>
            <Text>
                {item.title}
            </Text>
            <Text>
                {item.questions.length} Card(s)
            </Text>
        </View>
      </TouchableOpacity>
     )
      }

render() {
    const {decks} = this.props
    const listofDecks = Object.keys(decks).map(function(deckId) {
        return { key: deckId,
                 deck: decks[deckId],
                 title: decks[deckId].title,
                 questions: decks[deckId].questions
               }
      })

    return(
      <View>
        { Object.keys(decks).length !==0 ?
        <View style={styles.container}>
        <FlatList
        data={listofDecks}
        renderItem={this.renderList}
        />
        </View>
        : 
        <View>
          <Text>Please add a deck to your Deck List</Text>
        </View>
        }
        </View>
    )
}
}

function mapStateToProps (decks) {
    return {
      decks,
    }
  }

export default connect(
    mapStateToProps,
  )(DeckList)
  
  const styles = StyleSheet.create({
    decks: {
      flex: 1,
      alignItems: 'center',
      height: 110,
      justifyContent: 'center',
      borderRadius:5,
      shadowRadius: 3,
      shadowOpacity: 1,
     marginBottom:30,
     marginLeft:15,
     marginRight:15
    },
    container: {
backgroundColor:'#fff'
    }
  });