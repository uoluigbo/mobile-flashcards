import { Platform } from 'react-native'

export const gray = '#757575'
export const white = '#fff'
export const red = '#b71845'
export const orange = '#f68d4f'
export const blue = '#37c5dc'
export const green = '#36c5b7'
export const darkblue = '#2ea7ba'
export const mediumgray = '#b0b7c2'
export const darkgray = '#424d57'
export const lightgray = '#eef2f5'

export const card = {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 10 : 2,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    //marginLeft: 10,
    //marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.24)',
    shadowOffset: {
        width: 0,
        height: 3
    },
    width: '90%'
}

export const layout = {
    flex: 1,
    paddingTop: 25,
    backgroundColor: lightgray
  }

export const centerAll = {
    alignItems: 'center',
    justifyContent: 'center',
}

export const center = {
    justifyContent: 'center',
}

export const headerText = {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: 20
}

export const errorText = {
    color: red,
    marginTop: 20,
}