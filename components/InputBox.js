import React from 'react';
import { 
  StyleSheet,
  View, 
  TextInput,
 } from 'react-native'

 export default function InputBox ({ value, placeholder, onChange, multiline = false, blurOnSubmit = true, style = {}, inputStyle = {}}) {
    return (
        <View style={[styles.container, style]}>
            <TextInput
                value={value}
                style={[styles.input, inputStyle]}
                onChangeText={onChange}
                placeholder={placeholder}
                multiline={multiline}
                blurOnSubmit={blurOnSubmit}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 10,
    },
    input: {
      width: 300,
      height: 44,
      padding: 8,
      marginRight:80,
      marginLeft: 80,
      borderWidth: 1,
      borderColor: '#757575',
      margin: 20,
      marginLeft: 0,
      marginRight: 0,
    },
  });