import React, {Component} from 'react';
import { connect } from 'react-redux'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
 } from 'react-native';
 import { FontAwesome } from '@expo/vector-icons';



class Deck extends Component {
    static navigationOptions = ({navigation}) => {
        const { deck } = navigation.state.params
        return {
        headerLeft: (
            <View style={styles.cont}>
        <TouchableOpacity
        onPress={() => navigation.navigate(
            'Home')}
        >
          <View style={styles.headerBack}> 
            <FontAwesome name="angle-double-left" size={50}/>
            <Text style={styles.text}>{deck.title}</Text>
          </View>
      </TouchableOpacity>
          </View>
      
            )
        }
      }

      render() {
          const {deck} = this.props
          return (
              <View style={styles.container}>
              <TouchableOpacity>
                  <View style={styles.center}>
                  <Text style={styles.text}>{deck.title}</Text>
                  <Text style={styles.text}>{deck.questions.length} card(s)</Text>
                  <TouchableOpacity
                  style={styles.addCardButton}
                 onPress={() => this.props.navigation.navigate('AddCard', {deck:deck})}
                  >
                      <Text style={styles.addCardText}>
                          Add Card
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.addCardButton}
                  onPress={() => this.props.navigation.navigate('Quiz', {deck:deck, questions: deck.questions})}
                  >
                      <Text style={styles.addCardText}>
                          Start Quiz
                      </Text>
                  </TouchableOpacity>
                  </View>
                
              </TouchableOpacity>
              </View>
          )
      }
}
function mapStateToProps (state, {navigation}) {
    const {id, deck} = navigation.state.params 
    return {
     id,
     deck
    }
  }

export default connect(
    mapStateToProps,
  )(Deck)


const styles = StyleSheet.create({
headerBack: {
     flexWrap: 'wrap', 
    alignItems: 'flex-start',
     flexDirection:'row',
     height:'100%',
     paddingTop:15
},
container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    height: 150,
    justifyContent: 'center',
},
cont: {
    flex: 1,
    flexDirection:'row',
},

addCardButton: {
    alignSelf: 'center',
     backgroundColor: '#A0CED9',
     borderRadius: 10,
     height: 50,
     marginBottom: 10,
     width: 250,
     paddingLeft:80,
     justifyContent: 'center',
     alignContent:'center'
},
addCardText: {
    fontWeight: 'bold'
},
text: {
    fontSize:25,
    paddingTop: 10
},
center: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent:'center'
}
});