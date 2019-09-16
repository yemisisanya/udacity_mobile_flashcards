import React, {Component} from 'react';
import { StyleSheet, Text, View , TouchableOpacity} from 'react-native';
import { connect } from 'react-redux'
import FlipCard from 'react-native-flip-card'
import Tooltip from  'react-native-walkthrough-tooltip';
import { FontAwesome } from '@expo/vector-icons';


class Quiz extends Component {
    static navigationOptions = ({navigation }) => {
        const { deck } = navigation.state.params 
        return {
        headerLeft: (
        <TouchableOpacity
        onPress={() => navigation.navigate(
        'Deck')}
        >
          <View style={styles.headerBack}> 
            <FontAwesome name="angle-double-left" size={50}/>
            <Text style={styles.text}>{deck.title} Quiz</Text>
          </View>
      </TouchableOpacity>
        )
        }
      }
    state = {
        question:'',
        nextQuestion: '',
        correct: 0,
        incorrect:0,
        index:0,
        done: false,
        visible:true
    }

correct = () => {
    const {correct, index} = this.state
    const nindex = index + 1;
    const ncorrect = correct + 1;

    if(nindex < this.props.questions.length) {
        this.setState({
            index: nindex,
            correct: ncorrect,
        })
    }
    else {
        this.setState({
            correct: ncorrect,
            done: true,
        })
    }
}

incorrect = () => {
    const {incorrect, index} = this.state
    const nindex = index + 1;
    const nincorrect = incorrect + 1;

    if(nindex < this.props.questions.length) {
        this.setState({
            index: nindex,
            incorrect: nincorrect,
        })
    }
    else {
        this.setState({
            incorrect: nincorrect,
            done: true,
        })
    }
}

restart () {
    this.setState({
      index: 0,
      correct: 0,
      incorrect: 0,
      done: false
    })
  }

  goBack () {
    this.props.navigation.goBack()
  }


    render() {
    const {deck, questions} = this.props
    const {index, correct, incorrect, done, nindex} = this.state
    const question = questions[index]

  
       if(done) {
           return(
               <View>
                   <Text style={styles.text}>{correct} correct answer(s)</Text>
                   <Text style={styles.text}>{incorrect} incorrect answer(s)</Text>
                   <Text style={styles.text}>{((correct/questions.length)*100).toFixed(2)}%</Text>
                   <TouchableOpacity
                  style={styles.submitButton}
                 onPress={this.restart.bind(this)}
                  >
                      <Text style={styles.text}>  
                          Restart
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.submitButton}
                 onPress={this.goBack.bind(this)}
                  >
                      <Text style={styles.text}>  
                          Go back
                      </Text>
                  </TouchableOpacity>
               </View>
           )
       }
        return(
            
            <View style={styles.container}>
                {questions.length !== 0 ?
                <View style={styles.container}>
                        <FlipCard key={deck.title}>
                        <View>
                            <Text style={styles.text}>{index+1}/{questions.length}</Text>
                            <Text style={styles.text}>{question.question}</Text>
                        </View> 
                        <View>
                            <Text style={styles.text}>{index+1}/{questions.length}</Text>
                            <Text style={styles.text}>{question.answer}</Text>
                        </View>
                        </FlipCard>
                        <View>
                        <Tooltip
                   isVisible={this.state.visible}
                   content={<Text>Touch the screen to view answer at the back of card</Text>}
                   placement="center"
                   onClose={() => this.setState({ visible: false })}
                   >

                        <TouchableOpacity
                  style={styles.submitGreenButton}
                 onPress={this.correct.bind(this)}
                  >
                      <Text style={styles.text}>  
                          Correct
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                  style={styles.submitRedButton}
                 onPress={this.incorrect.bind(this)}
                  >
                      <Text style={styles.text}>  
                          Incorrect
                      </Text>
                  </TouchableOpacity>
                  </Tooltip>
                        </View>
                        </View>
                            : (
                                <View>
                                    <Text>There are no questions. Please add a card to deck</Text>
                                    <TouchableOpacity
                  style={styles.submitButton}
                 onPress={this.goBack.bind(this)}
                  >
                      <Text>  
                          Go back
                      </Text>
                  </TouchableOpacity>
                                </View>
                            )  }
                         </View>
        )
}
}

function mapStateToProps (state, {navigation}) {
    const {deck, questions} = navigation.state.params 
    return {
    deck,
    questions
    }
  }

export default connect(
    mapStateToProps,
  )(Quiz)

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
    submitRedButton: {
    alignSelf: 'center',
     backgroundColor: 'red',
     borderRadius: 10,
     height: 50,
     marginBottom: 100,
     width: 250,
     paddingLeft:80,
     justifyContent: 'center',
     alignContent:'center'
    },
    submitGreenButton: {
        alignSelf: 'center',
         backgroundColor: 'green',
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
        submitButton: {
            alignSelf: 'center',
             backgroundColor: '#A0CED9',
             borderRadius: 10,
             height: 50,
             marginBottom: 100,
             width: 250,
             paddingLeft:80,
             justifyContent: 'center',
             alignContent:'center'
            },
});