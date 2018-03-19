import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { red, blue } from '../utils/Colors'

export default function Table ({grid, styleViewContainer, styleViewSquare, styleTextDraw, draw}) {
  return (
    <View style={styleViewContainer}>
      {grid.map(
      (square, i) =>  (
        <View key={i} style={{flexDirection: 'row'}}>
          {square.map((v,k)=>(
            <View
              key={k}
              style={styleViewSquare}
              onTouchStart={() => draw(i,k)}
            >
              <Text style={[styleTextDraw, styles.text,{ color: grid[i][k] === 'X' ? red : blue}]}>
                {grid[i][k]}
              </Text>
            </View>
          ))}              
        </View>   
      ))}
    </View> 
  )
}
/**
 * @description Styles
 */
const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
})