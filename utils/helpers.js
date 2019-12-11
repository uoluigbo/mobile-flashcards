import React from 'react'
import {View, StyleSheet, AsyncStorage } from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'

const NOTIFICATION_KEY = 'MobileFlashcard:notifications'

export function setNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
     .then(JSON.parse)
     .then(data => {
         if(data === null) {
             Permissions.askAsync(Permissions.NOTIFICATIONS)
              .then(({ status }) => {
                  if( status === 'granted') {
                      Notifications.cancelAllScheduledNotificationsAsync()

                      let time = new Date()
                      time.setDate(time.getDate() +1)
                      time.setHours(19)
                      time.setMinutes(0)
                      
                      Notifications.scheduleLocalNotificationAsync(
                          createNotification(),
                          {
                              time: time,
                              repeat: 'day'
                          }
                      )

                      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                  }
              })
         }
     })
}

export function clearNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
            .then(Notifications.cancelAllScheduledNotificationsAsync())
}

export function createNotification() {
    return {
        title: 'Flashcard: Quiz',
        body: "Let's get a quiz done today!",
        ios: {
          sound: true
        },
        android: {
          sound: true,
          priority: 'high',
          sticky: false,
          vibrate: true
        }
      }
}