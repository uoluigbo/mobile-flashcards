import React, { Component } from 'react'
import { View, Text,StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { card, headerText, centerAll, orange, white, lightgray, green, blue } from '../utils/styles'
import ProgressCircle from 'react-native-progress-circle'
import Button from './Button'
import { clearNotification, setNotification } from '../utils/helpers'

class Result extends Component {
    setLocalNotificatin = () => {
        clearNotification()
         .then(setNotification())
    }

    render() {
        const { correctAnswers, totalQuestions, retakeQuiz, goToHome } = this.props
        const percent = Math.round((correctAnswers/totalQuestions)*100)

        this.setLocalNotificatin()

        return (
            <View style={[card, centerAll ]}>
                <Text style={[headerText, styles.titleText]}>Your result:</Text>
                <ProgressCircle
                    percent={percent}
                    radius={50}
                    borderWidth={8}
                    color={blue}
                    shadowColor={lightgray}
                    bgColor={white}
                >
                    <Text style={styles.percentText}>{percent}%</Text>
                </ProgressCircle>
                
                <Text style={styles.scoreText}>{correctAnswers} out of {totalQuestions} correct</Text>
                <View style={styles.options}>
                    <Button style={styles.retakeBtn} onPress={retakeQuiz} label="Retake Quiz" />
                    <Button style={styles.backBtn} onPress={goToHome} label="Back to Decks" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    scoreText: {
        fontSize: 18,
        marginTop: 20,
    },
    percentText: {
        fontSize: 20
    },
    titleText: {
        fontSize: 24,
        marginTop: 0,
    },
    options: {
        marginTop: 20
    },
    retakeBtn: {
        backgroundColor: orange,
        marginTop: 20,
    },
    backBtn: {
        backgroundColor: green,
        marginTop: 20,
    },
})

function mapStateToProps(state, { correctAnswers, totalQuestions, retakeQuiz, goToHome }) {
    return {
        correctAnswers,
        totalQuestions,
        retakeQuiz,
        goToHome
    }
}

export default connect(mapStateToProps)(Result)