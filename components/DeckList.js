import React, { Component } from 'react'
import { View, Text, Platform, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import Deck from '../components/Deck'
import { card, headerText, layout, } from '../utils/styles'
import { AppLoading } from 'expo'

class DeckList extends Component {
    state = {
        ready: false
    }

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ( { tintColor }) => {
                let iconName = Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'
                return <Ionicons name={iconName} size={30} color={tintColor} />
              },
            tabBarLabel: 'Decks',
            headerShown: false,
        }
    }

    componentDidMount() {
        const { dispatch } = this.props

        getDecks()
         .then((decks) => dispatch(receiveDecks(decks)))
         .then(() => this.setState(() => ({ready: true})))
    }

    renderItem = ({item}) => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate(
                    'DeckDetail',
                    {deckId: item.id, title: item.title}
                )}>
                    <Deck deck={item} />
                </TouchableOpacity>
            </View>
            
        )
    }

    getKey = (item, index) => {
        return item.id
    }

    renderEmptyDeck = () => {
        return <View style={[card, styles.center]}>
                <Text style={styles.noData}>There are no decks. Please add a deck</Text>
            </View>
    }

    render() {
        const { decks } = this.props
        const { ready } = this.state
        const len = Object.keys(decks).length

        if(ready === false) {
            return <AppLoading />
        }
        
        return (
            <View style={[layout, styles.container, len === 0 ? styles.center : {}]}>
                <Text style={[headerText, styles.center, {marginTop: 0}]}>Decks</Text>
                <View style={[len === 0 ? styles.card : {}]}>
                    <FlatList 
                        keyExtractor={this.getKey} 
                        data={Object.keys(decks).map((deck) => decks[deck])} 
                        renderItem={this.renderItem}  
                        ListEmptyComponent={this.renderEmptyDeck}
                    />


                </View>
                
            </View>
        )
    }
}

 

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    card: {
        marginLeft: 0,
        marginRight: 0,
        paddingLeft: 0,
        paddingRight: 0,
    },
    center: {
        alignSelf: 'center'
    },
    noData: {
        fontSize: 20,
    }
  });

function mapStateToProps(state) {
    return {
        decks: state
    }
}

export default connect(mapStateToProps)(DeckList)

/**
 * <View style={[layout, styles.container, len == 0 ? styles.center : {}]}>
                <Text style={[headerText, styles.center]}>Decks</Text>
                {
                    len > 0
                     ? Object.keys(decks).map((deck) => <Deck key={deck} deck={decks[deck]}/>)
                     : <View style={card}>
                        <Text style={styles.noData}>There are no decks. Please add a deck</Text>
                        </View>
                }
            </View>

            {
                    len > 0
                     ? <FlatList keyExtractor={this.getKey} data={Object.keys(decks).map((deck) => decks[deck])} renderItem={this.renderItem}  />
                     : <View style={card}>
                            <Text style={styles.noData}>There are no decks. Please add a deck</Text>
                        </View>
                }
 */