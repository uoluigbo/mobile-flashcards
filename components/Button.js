import React from 'react'
import { Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { blue, white } from '../utils/styles'

export default function Button ({ label, onPress, style = {}}) {
    return (
        <TouchableOpacity onPress={onPress} style={[Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.androidSubmitBtn, style]}>
            <Text style={styles.btnText}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    iosSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        height: 45,
        borderRadius: 7,
        marginLeft: 30,
        marginRight: 30
    },
    androidSubmitBtn: {
        backgroundColor: blue,
        padding: 10,
        paddingRight: 20,
        paddingLeft: 20,
        borderRadius: 2,
        height: 45,
        marginLeft: 30,
        marginRight: 30,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: white,
        fontSize: 20,
        textAlign: 'center'
    },
})