import React, {Component} from 'react';
import { saveDeckTitle } from '../utils/helpers';
import { connect } from 'react-redux'
import { 
    StyleSheet,
    Text,
    Keyboard,
    TextInput,
    TouchableOpacity,
    View,
 } from 'react-native';
import { addDeck } from '../actions';

class addDecks extends Component {
    state ={
        title: ''
    }

onChangeAdd = (title) => {
this.setState({
    title: title
})
}

onSubmit = () => {
    Keyboard.dismiss();
    this.props.dispatch(addDeck(this.state.title))
    saveDeckTitle(this.state.title)
    this.setState({
        title: ''
    })

 return(this.props.navigation.navigate('Home'))

}
      render() {

          return (
              <View style={styles.container}>
              <TextInput
              style={styles.input}
              placeholder="Enter deck title"
              onChangeText={this.onChangeAdd}
              onSubmitEditing={Keyboard.dismiss}
              value={this.state.title}
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
function mapStateToProps (state, {navigation}, decks) {
    console.log(decks, navigation)
    return {
    navigation,
    decks,
    }
  }

export default connect(
    mapStateToProps,
  )(addDecks)

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