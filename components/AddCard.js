import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { white, layout, errorText, card } from '../utils/styles'
import { handleAddCardToDeck } from '../actions'
import Button from './Button'
import InputBox from './InputBox'

const { height } = Dimensions.get('window')

class AddCard extends Component {
    state = {
        question: '',
        answer: '',
        displayError: false,
        contentHeight: 0,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Add Card',
            headerShown: true,
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ contentHeight });
      };

    handleQuestionChange = (question) => {
        this.setState(()=> ({
            question
        }))
    }

    handleAnswerChange = (answer) => {
    this.setState(()=> ({
        answer
    }))
    }

    handleSubmit = () => {
        const { dispatch, deckId, } = this.props
        const { question, answer } = this.state

        if (this.state.question === '' || this.state.answer === '') {
            this.setState(()=> ({
                displayError: true
                }))
            return
        }
        
        //save data
        dispatch(handleAddCardToDeck(deckId, question, answer))

        //reset values
        this.setState(()=> ({
            question: '',
            answer: '',
            displayError: false,
          }))
          
        //return to home
        this.backToDetail()
    }

    backToDetail = () => {
        const { deck } = this.props
        
        this.props.navigation.navigate(
            'DeckDetail',
            {title: deck.title}
        )
    }
    
    render() {
        const { deckId, deck } = this.props
        const scrollEnabled = this.state.contentHeight > height;

        return (
            <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollview}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
            >
                <KeyboardAvoidingView behavior="padding" style= {[layout, styles.container]}>
                    <View style= {[{background: white, alignItems: 'center', }]}>
                        
                        <Text style={styles.labelText}>Enter a question and an answer to that question</Text>
                        {this.state.displayError && 
                            <Text style={errorText}>Enter both question and answer before submitting</Text>
                        }
                        <InputBox multiline={true} inputStyle={styles.input} onChange={this.handleQuestionChange} value={this.state.question} placeholder='Enter question' />
                        <InputBox multiline={true} inputStyle={[styles.input, {marginTop: 10}]} onChange={this.handleAnswerChange} value={this.state.answer} placeholder='Enter Answer' />
                        <Button style={styles.btn} onPress={this.handleSubmit} label="Submit" />
                        
                        
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingRight: 20,
      paddingLeft: 20,
    },
    btn: {
        marginTop: 30,
    },
    labelText: {
        fontSize: 30,
        marginBottom: 20,
    },
    input: {
        height: 60
    },
    scrollview: {
        flex: 1
    }
  });

function mapStateToProps(state, { navigation }) {
    const { deckId, } = navigation.state.params

    return {
        deckId: deckId,
        deck: state[deckId],
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    const { deckId, } = navigation.state.params

    return {
        dispatch,
        goBack: () => navigation.navigate(
            'DeckDetail',
            {deckId: deckId}
            )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)