import React, { Component } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { connect } from 'react-redux'
import { handlRemoveDeck } from '../actions'
import { headerText, red, darkgray, card, lightgray, layout, darkblue, white } from '../utils/styles'
import Button from './Button'
import Link from './Link'
import { HeaderBackButton } from 'react-navigation-stack'

class DeckDetail extends Component {
    state = {
        redirect: false,
        render: true
    }

    static navigationOptions = ({ navigation }) => {
        const { title } = navigation.state.params
        return {
            title: title,
            headerShown: true,  
            headerTitleStyle: Platform.OS === 'android'? {paddingLeft: 40, alignSelf: 'center'} : {},
            headerLeft: () => (
                <HeaderBackButton
                  onPress={() => navigation.navigate('DeckList')}
                  title="Decks"
                  backTitleVisible={true}
                  tintColor={white}
                />
            ),
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.render 
    }

    goToAddCard = () => {
        const { deck } = this.props
        this.props.navigation.navigate('AddCard', {deckId: deck.id}, {updateSuccessful: () => this.updateCardAdded()})
    }

    goToQuiz = () => {
        const { deck } = this.props
        this.props.navigation.navigate('Quiz', {deckId: deck.id})
    }

    updateCardAdded = () => {
        this.setState(() => ({
            cardAdded: true
        }))
    }

    handleDeleteDeck = () => {
        const { deck, removeDeck, goToHome } = this.props

        this.setState(() => ({redirect : true, render: false }))

        removeDeck(deck)
        goToHome()
    }

    toHome = () => {
        
        this.props.navigation.navigate('DeckList')
    }

    render() {
        const { deck } = this.props
        const { goToHome } = this.state

        if (goToHome === true) {
            this.toHome()
        }

        return (
            <View style={[layout, styles.container]}>
                <View style={[card, {alignItems: 'center'}]}>
                    <Text style={[headerText, styles.titleText]}>{deck.title}</Text>
                    <Text style={styles.countText}>{ deck.questions.length } cards</Text>
                    <View style={styles.options}>
                        <Button style={styles.addBtn} onPress={this.goToAddCard} label="Add Card" />
                        <Button style={styles.quizBtn} onPress={this.goToQuiz} label="Start Quiz" />
                        <Link style={styles.linkText} label='Delete Deck'onPress={this.handleDeleteDeck} />
                    </View>
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
    addBtn: {
        width: 180
    },
    quizBtn: {
        backgroundColor: darkgray,
        marginTop: 30,
        width: 180
    },
    titleText: {
        fontSize: 30
    },
    options: {
        marginTop: 60
    },
    countText: {
        fontSize: 18,
        color: darkgray
    },
    linkText: {
        fontSize: 18,
        color: red, 
        marginTop: 10
    },
  });

function mapStateToProps(state, { navigation }) {
    const { title } = navigation.state.params
    let deck = {}

    for( let k in state ) {
        if(state[k]['title'] === title) {
            deck = state[k]
        }
    }   

    return {
        deck
    }
}

function mapDispatchToProps (dispatch, { navigation }) {
    return {
        removeDeck: (deck) => dispatch(handlRemoveDeck(deck)),
        goToHome: () => navigation.navigate('DeckList')
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetail)