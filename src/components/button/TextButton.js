import React from 'react'
import { ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { black } from '../../utils/Colors'

const buttonCheck = require('../../image/wood-button-check.png')
const buttonUnCheck = require('../../image/wood-button.png')

export default function TextButton ({children, onPress, typeButton, width}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ImageBackground 
        source={typeButton === true ? buttonCheck : buttonUnCheck}
        style={{width: width, height: 45}}
      >
        <Text style={styles.textButton}>{children}</Text>
      </ImageBackground>
    </TouchableOpacity>
  )
}
/**
 * @description Styles
 */
const styles = StyleSheet.create({
  textButton:{
    fontSize: 30,
    color: black,
    padding: 2.5,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    padding: 5,
    borderRadius: 2
  }
})