import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { connect } from 'react-redux'
import { layout, lightgray, green, darkgray, card, headerText, centerAll, orange } from '../utils/styles'
import Button from './Button'
import Link from './Link'

class Card extends Component {
    state = {
        showAnswer: false,
        showQuestion: true,
        opacity: new Animated.Value(0),
    }

    componentDidMount() {
        Animated.timing(this.state.opacity, { toValue:1, duration: 0 }).start()
    }

    fadeInOut = () => {
        const { opacity } = this.state
        Animated.sequence([
            Animated.timing(opacity, { toValue:0, duration: 0 }),
            Animated.timing(opacity, { toValue:1, duration: 500 })
        ]).start()
    }

    handleShowAnswer = () => {
        this.fadeInOut()

        this.setState(() => ({
            showAnswer: true,
            showQuestion: false
        }))
    }

    handleShowQuestion = () => {
        this.fadeInOut()

        this.setState(() => ({
            showAnswer: false,
            showQuestion: true
        }))
        
        
    }

    handleCorrectButtonClick = () => {
        const { correctClicked } = this.props

        this.resetState()

        correctClicked()
    }

    handleIncorrectButtonClick = () => {
        const { incorrectClicked } = this.props

        this.resetState()

        incorrectClicked()
    }

    resetState = () => {
        this.setState(() => ({
            showAnswer: false,
            showQuestion: true,
        }))
    }

    render() {
        const { deck, cardIndex,  } = this.props
        const { showAnswer, showQuestion, interpolF, interpolB, opacity } = this.state
        const quizText = showAnswer ? deck['questions'][cardIndex]['answer'] : deck['questions'][cardIndex]['question']

        return (
            <View style={[card, centerAll, ]}>
            {
                showAnswer 
                ? <Animated.View style={[{opacity: opacity,} ]}>
                    <Text style={[styles.titleText]}>{quizText}</Text>
                    <Link style={styles.linkText} label='Question'onPress={this.handleShowQuestion} />
                </Animated.View>
                : <Animated.View style={[{opacity: opacity, } ]}>
                    <Text style={[styles.titleText]}>{quizText}</Text>
                    <Link style={styles.linkText} label='Answer'onPress={this.handleShowAnswer} />
                </Animated.View>
            }
            <View style={styles.options}>
                <Button style={styles.correctBtn} onPress={this.handleCorrectButtonClick} label="Correct" />
                <Button style={styles.incorrectBtn} onPress={this.handleIncorrectButtonClick} label="Incorrect" />
            </View>
            <View style={{marginTop: 20}}>
                <Text style={styles.questionNumText}>Card {(cardIndex+1)} of {deck.questions.length}</Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      alignItems: 'center',
      backgroundColor: lightgray,
    },
    correctBtn: {
        backgroundColor: green,
        marginTop: 30,
        width: 150
    },
    incorrectBtn: {
        backgroundColor: orange,
        marginTop: 30,
        width: 150
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'normal',
        marginBottom: 20,
    },
    options: {
        marginTop: 20
    },
    questionNumText: {
        fontSize: 14,
        color: darkgray,
    },
    linkText: {
        fontSize: 18
    }
  });

function mapStateToProps(state, { deckId, correctClicked, incorrectClicked, cardIndex, deleteDeck }) {

    return {
        deck: state[deckId],
        correctClicked,
        incorrectClicked,
        cardIndex,
        deleteDeck
    }
}

export default connect(mapStateToProps)(Card)