import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome }from '@expo/vector-icons'
import { white, lightgray, darkgray, card, darkblue } from '../utils/styles'

class Deck extends Component {

    render() {
        const { deck } = this.props

        return (
            <View style={[styles.container, {flexDirection: "row", justifyContent:'space-between',}] }>
                <View>
                    <Text style={styles.titleText}>{ deck.title }</Text>
                    <Text style={styles.countText}>{ deck.questions.length } cards</Text>
                </View>
                <FontAwesome name='angle-right' size={30} color={darkblue} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: white,
        marginBottom: 2,
        padding: 20,
        paddingTop: 20,
        paddingBottom: 20,
    },
    titleText: {
        fontSize: 24,
        padding: 10,
        
    },
    hr: {
        borderTopColor: lightgray,
        borderTopWidth: 1,
        width: '100%',
        marginTop: 20,
        marginBottom: 20,
    },
    countText: {
        fontSize: 16,
        color: darkgray,
        paddingLeft: 10,
    },
    noData: {
        fontSize: 20,

    }
  })

function mapStateToProps( state, { deck } ) {
    return (
        {
            deck
        }
    )
}

export default connect(mapStateToProps)(Deck)