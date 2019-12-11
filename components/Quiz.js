import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { layout, lightgray } from '../utils/styles'
import { Foundation } from '@expo/vector-icons'
import Card from './Card'
import Result from './Result'

const { height } = Dimensions.get('window')

class Quiz extends Component {
    state = {
        correct: 0,
        incorrect: 0,
        cardIndex: 0,
        contentHeight: 0,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Quiz',
            headerShown: true,
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ contentHeight });
      };

    handleCorrectClicked = () => {
        this.setState((prevState) => ({
            correct: prevState.correct + 1,
            cardIndex: prevState.cardIndex + 1,
        }))
    }

    handleInCorrectClicked = () => {
        this.setState((prevState) => ({
            incorrect: prevState.incorrect + 1,
            cardIndex: prevState.cardIndex + 1,
        }))
    }

    retakeQuiz = () => {
        this.resetQuiz()
    }

    goToHome = () => {
        this.props.navigation.navigate('DeckList')
    }

    resetQuiz = () => {
        this.setState((prevState) => ({
            correct: 0,
            incorrect: 0,
            cardIndex: 0,
        }))
    }

    render() {
        const { deckId, deck } = this.props
        const questions = deck.questions
        const nextQuestion = (typeof questions[this.state.cardIndex] !== 'undefined') ? true : false
        const { cardIndex, correct, incorrect , contentHeight} = this.state
        const scrollEnabled = contentHeight > height;
        
        if (questions.length === 0) {
            return (
                <View style={[layout, styles.container, styles.noQuiz]}>
                    {/*<FontAwesome name='hand-stop-o' size={30} color='red' />*/}
                    <Foundation name='alert' size={30} color='red' />
                    <Text style={styles.stopText}>Sorry you can't take a quiz because there are no cards in this deck</Text>
                </View>
            )
        }

        return (
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollview}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
                >
            <View style={[layout, styles.container]}>
                {
                    nextQuestion 
                     ? <Card deckId={deckId} cardIndex={cardIndex} correctClicked={this.handleCorrectClicked} incorrectClicked={this.handleInCorrectClicked} />
                     : <Result deckId={deckId} correctAnswers={correct} totalQuestions={questions.length} goToHome={this.goToHome} retakeQuiz={this.retakeQuiz} />
                }
                
            </View>
        </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      alignItems: 'center',
      backgroundColor: lightgray,
    },
    noQuiz: {
        top: -100,
        paddingRight: 60,
        paddingLeft: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    stopText: {
        marginTop: 20,
        fontSize: 16,
    },
    scrollview: {
        flex: 1
    }
  });

function mapStateToProps(state, { navigation }) {
    const { deckId } = navigation.state.params

    return {
        deckId: deckId,
        deck: state[deckId],
    }
}

export default connect(mapStateToProps)(Quiz)