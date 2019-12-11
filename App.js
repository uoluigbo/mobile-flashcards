import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, StatusBar } from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import Constants from 'expo-constants'
import reducer from './reducers'
import middleware from './middleware'
import DeckList from './components/DeckList'
import DeckDetail from './components/DeckDetail'
import Quiz from './components/Quiz'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import { darkblue, white, lightgray, gray } from './utils/styles'
import { setNotification } from './utils/helpers'

function AppStatusBar ( {backgroundColor, ...props } ) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const profile = {
  DeckList: DeckList,
  AddDeck: AddDeck,
}

const config = {
  defaultNavigationOptions: ( {navigation} ) => ({
    header: null,
  }),
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? darkblue : white,
    labelStyle: {
      fontSize: 14,
    },
    labelPosition: 'below-icon',
    style: {
      height: Platform.OS === 'ios' ? 56 : 70,
      backgroundColor: Platform.OS === 'ios' ? white : darkblue,
      shadowColor: 'rgba(0,0,0,0.24',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 0.3
    }
  },
}

const Tabs = Platform.OS === 'ios'? createBottomTabNavigator(profile, config) : createMaterialTopTabNavigator(profile, config)

const TabNavigator = createAppContainer(Tabs)

const Stack = createStackNavigator (
  {
    Home: {screen: TabNavigator},
    DeckDetail: {screen: DeckDetail},
    Quiz: {screen: Quiz},
    AddCard: {screen: AddCard}
  },
  {
    defaultNavigationOptions: ( {navigation} ) => ({
      headerTintColor: white,
      headerStyle: {
        backgroundColor: darkblue,
      },
      headerShown: false
    })
  }
)

const MainNavigator = createAppContainer(Stack)

export default class App extends Component {
  componentDidMount() {
    return setNotification()
  }

  render() {
    

    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={[{flex: 1,backgroundColor: lightgray}]} >
        <AppStatusBar backgroundColor={darkblue} barStyle='light-content' />
          <MainNavigator /> 
        </View>
      </Provider>
        
      
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  navFocused: {
    color: Platform.OS === 'ios' ? darkblue : white
  },
  navNoFocus: {
    color: gray
  }
});
/**
 * 
 *  <Provider store={createStore(reducer, middleware)}>
        <View style={styles.container} >
          <AppStatusBar backgroundColor={green} barStyle='light-content' />
          <TabNavigator /> 
        </View>
      </Provider>
 */
