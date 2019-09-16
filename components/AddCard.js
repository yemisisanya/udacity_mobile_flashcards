import React, {Component} from 'react';
import { addCardToDeck } from '../utils/helpers';
import { connect } from 'react-redux'
import { 
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
 } from 'react-native';
 import { FontAwesome } from '@expo/vector-icons';
 import {  addQuestion }  from '../actions'
 
class AddCard extends Component {

    state ={
        question: '',
        answer: ''
    }
    static navigationOptions = ({navigation }) => {
        return {
        headerLeft: (
        <TouchableOpacity
        onPress={() => navigation.navigate(
        'Deck')}
        >
          <View style={styles.headerBack}> 
            <FontAwesome name="angle-double-left" size={50}/>
            <Text style={styles.text}>Add Card</Text>
          </View>
      </TouchableOpacity>
        )
        }
      }
onChangeQuestion = (question) => {
this.setState({
    question:question
})
}
onChangeAnswer = (answer) => {
    this.setState({
        answer:answer
    })
}

onSubmit = () => {
    const questions = {
        question: this.state.question,
        answer: this.state.answer
    }
    this.props.dispatch(addQuestion(this.props.deck.title, questions))
    this.props.deck.questions.push(questions)
    addCardToDeck(this.props.deck.title, this.props.deck.questions)
    this.setState({
        answer:'',
        question: ''
    })
    return(this.props.navigation.navigate('Home'))
}
      render() {

          return (
              <View style={styles.container}>
              <TextInput
              style={styles.input}
              placeholder="Enter card question"
              onChangeText={this.onChangeQuestion}
              multiline = {true}
              />
              <TextInput
              style={styles.input}
              placeholder="Enter card answer"
              onChangeText={this.onChangeAnswer}
              multiline = {true}
              />
               <TouchableOpacity
                  style={styles.submitButton}
                 onPress={this.onSubmit}
                  >
                      <Text style={styles.text}>
                          Submit
                      </Text>
                  </TouchableOpacity>
              </View>
          )
      }
}
function mapStateToProps (state, {navigation}) {
    const {deck} = navigation.state.params 
    return {
    deck
    }
  }

export default connect(
    mapStateToProps,
  )(AddCard)


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    
      },
      headerBack: {
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
         flexDirection:'row',
         height:'100%',
         paddingTop:15
    },
    submitButton: {
        alignSelf: 'center',
             backgroundColor: 'yellow',
             borderRadius: 10,
             height: 50,
             marginBottom: 100,
             width: 250,
             paddingLeft:80,
             justifyContent: 'center',
             alignContent:'center'
    },
    text: {
        fontSize:25,
        paddingTop: 10
    },
    input: {
        height: 100,
        width: 350
    }
});