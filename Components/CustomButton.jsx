import { Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

export default function CustomButton({onPress, text, type = "PRIMARY"}) {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      padding: 15,
      marginVertical: 5,
      alignItems: 'center',
      borderRadius: 5,
    },
    
    container_PRIMARY: {
      backgroundColor: '#3B71F3',
    },

    text: {
      fontWeight: 'bold',
      color: 'white',
    },

    text_TERTIARY: {
      color: 'grey'
    }
})