import React, { Component } from 'react'
import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { FontAwesome }from '@expo/vector-icons'
import Button from './Button'
import InputBox from './InputBox'
import { layout, errorText, card, } from '../utils/styles'
import { handleAddDeck } from '../actions'

const { height } = Dimensions.get('window')

class AddDeck extends Component {
    state = {
        title: '',
        displayError: false,
        contentHeight: 0,
    }

    static navigationOptions = ({ navigation }) => {
        return {
            tabBarIcon: ( { tintColor }) => {
                return <FontAwesome name='plus-square' size={30} color={tintColor} />
              },
            tabBarLabel: 'Add Deck',
        }
    }

    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({ contentHeight });
      };

    handleChange = (title) => {
        
        this.setState(()=> ({
          title
        }))
      }

    handleSubmit = (e) => {
        e.preventDefault()

        const { dispatch } = this.props

        if (this.state.title === '') {
            this.setState(()=> ({
                displayError: true
                }))
            return
        }

        //return to home
        this.toDetail()
        
        //save data
        dispatch(handleAddDeck(this.state.title))

        //reset title value
        this.setState(()=> ({
            title: '',
            displayError: false,
          }))

    }

    toHome = () => {
        this.props.navigation.navigate('DeckList')
    }

    toDetail = () => {
        this.props.navigation.navigate(
            'DeckDetail',
            { title: this.state.title }
        )
    }

    render() {
        const scrollEnabled = this.state.contentHeight > height;

        return (
            <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.scrollview}
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
            >
                <KeyboardAvoidingView  behavior="padding" style= {[layout, styles.container]}>
                    <View style= {[card, {alignItems: 'center'}]}>
                        <Text style={styles.labelText}>What is the title of your new deck</Text>
                        {this.state.displayError && 
                            <Text style={errorText}>Please enter a title</Text>
                        }
                        <InputBox style={styles.input} onChange={this.handleChange} value={this.state.title} placeholder='Enter Title' />
                        <Button style={styles.btn} onPress={this.handleSubmit} label="Submit" />
                    </View>
                    
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
      alignItems: 'center',
    },
    btn: {
        marginTop: 30,
    },
    labelText: {
        fontSize: 30,
        marginBottom: 20,
    },
    scrollview: {
        flex: 1
    },
  });

function mapStateToProps() {
    return {
        
    }
}

export default connect(mapStateToProps)(AddDeck)