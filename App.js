import React from 'react'
import { View } from 'react-native'
import Main from './src/components/Main'
import TieStatusBar from './src/components/TieStatusBar'
import { black } from './src/utils/Colors'

export default class App extends React.Component {  
  render() {
    return (
      <View style={{flex:1}}>
        <TieStatusBar backgroundColor={black} barStyle='light-content'/>
        <Main />
      </View>
    )
  }
}