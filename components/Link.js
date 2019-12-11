import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { darkblue } from '../utils/styles'

export default function Link ({ label, onPress, style = {}}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={[styels.link, style]}>{label}</Text>
        </TouchableOpacity>
    )
}

const styels = StyleSheet.create({
    link: {
        textAlign: 'center',
        color: darkblue,
        fontWeight: "bold",
        padding: 10
    }
})