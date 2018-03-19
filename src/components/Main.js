import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground
} from 'react-native'
import Table from './Table'
import TextButton from './button/TextButton'
import { red, blue, black } from '../utils/Colors'

var {width,height} = Dimensions.get('window')

export default class Main extends Component {
  /**
   * @description Represent the App
   */
  constructor(){
    super()
    this.state = { 
      buttonOne: false,
      buttonTwo: false,         
      winner: " ",
      player: "X",
      game: false,
      gameOver: false,
      grid: [[" "," "," "],[" "," "," "],[" "," "," "]]
    }
  }
  /**
   * @description Update the grid of the game
   */
  draw = (i,j) => {
    let won
    let newArray = [...this.state.grid]
    if (this.state.buttonOne || this.state.buttonTwo)
    {
      if (this.state.winner === " ") {          
        if (this.state.grid[i][j] === " ") {
          newArray[i][j] = this.state.player
          if (this.state.buttonTwo && this.state.player === "0") {
            this.state.player = "X"
          } else {
            this.state.player = "0"
          }
          this.setState(() => ({
            grid: newArray,         
            player: this.state.player
          }))
          won = this.checkWin(this.state.grid)
          if(won === "X"){
            this.setState({winner: "Win player X"})
          }
          else if(won === "0"){
            this.setState({ winner: "Win player 0"})
          }else if(won === "T"){
            this.setState({winner: "TIE"})
          }
          else{
            if(this.state.buttonOne)
            this.playerMachine() 
          }           
        }
      }
    }   
  }
  /**
   * @description Search a position available for the machine
   */
  playerMachine = () => {
    let i
    let j
    do{
      i =  Math.floor(Math.random() * 3)
      j =  Math.floor(Math.random() * 3)
    }
    while(this.state.grid[i][j] != " ")

    let newArray = [...this.state.grid]
    newArray[i][j] = this.state.player

    this.setState(() => ({
      grid: newArray,
      player: 'X'
    }))

    won = this.checkWin(this.state.grid)
    if (won === "X") {
      this.setState({winner: "Win player X"})
    } else if (won === "0") {
      this.setState({ winner: "Win player 0"})
    } else if (won === "T") {
      this.setState({winner: "TIE"})
    }        
  }
  /**
   * @description Check whether the winner is player X or 0 
   */
  checkWin = (grid) => {
    let playerV0=0
    let playerH0=0
    let playerVX=0
    let playerHX=0
    let playerDRX = 0
    let playerDLX = 0
    let playerDR0 = 0
    let playerDL0 = 0
    let winner = "none"
    let tie = 0
    for (var i = 0; i < grid.length; i++) {
      for (var j = 0; j < grid.length; j++) {    
        if (grid[i][j] === '0') { 
          if(i === j)
            playerDL0++
          if (i + j === 2)
            playerDR0++   
          playerH0++
          tie++
        }
        if (grid[i][j] === 'X') {
          if(i === j)
            playerDRX++
          if (i + j === 2)
            playerDLX++
          playerHX++
          tie++
        }
        if (grid[j][i] === '0')
          playerV0++
        if (grid[j][i] === 'X')
          playerVX++
      } 
      if (playerV0 === 3 || playerH0 === 3 || playerDL0 === 3 || playerDR0 === 3) {
        winner = "0"
        tie = 0
        this.setState(() => ({ gameOver: true}))
        break
      } else if (playerHX === 3 || playerVX === 3 || playerDLX === 3 || playerDRX === 3) {
        winner = "X"
        tie = 0
        this.setState(() => ({ gameOver: true}))  
        break
      }     
      playerH0 = 0
      playerHX = 0
      playerV0 = 0
      playerVX = 0
    }   
    if (tie === 9) {
      winner = "T"
      this.setState(() => ({ gameOver: true}))
    }      
    return winner
  }
  /**
   * @description Update state for one player
   */
  onePlayer = () => {
    if (!this.state.game) {
      this.setState(() => ({
        buttonOne: true,
        buttonTwo: false,
        game: true,
      }))
    }
  }
  /**
   * @description Update state for two player
   */
  twoPlayer = () => { 
    if(!this.state.game)
    {
      this.setState(() => ({
      buttonTwo: true,
      buttonOne: false,
      game: true,
      }))
    }
  }
  /**
   * @description Reset the game
   */
  newGame = () => {
    let newArray = [...this.state.grid]
    for(var i = 0; i < newArray.length; i++){
      for(var j = 0; j < newArray.length; j++){
        newArray[i][j] = " "
      }
    }
    this.setState(() => ({
      winner: ' ',
      player: 'X',
      buttonOne: false,
      buttonTwo: false,
      game: false,
      gameOver: false,
      grid: newArray
    }))
  }
  render () {
    const {gameOver, winner, buttonTwo, buttonOne, grid}=this.state
    return (
      <ImageBackground
        style={styles.container}
        source={require('../image/wood.png')}
      > 
        <View style={styles.viewButton}>
          <TextButton 
            children='Single Player' 
            typeButton={buttonOne} 
            width={width}
            onPress={this.onePlayer}
          />
          <TextButton 
            children='MultiPlayer' 
            typeButton={buttonTwo} 
            width={width}
            onPress={this.twoPlayer}
          />
        </View>
        <Table 
          grid={grid} 
          styleViewContainer={styles.viewContainer}
          styleViewSquare={styles.viewSquare}
          styleTextDraw={{fontSize: width/4}}
          draw={this.draw}
        />
        {gameOver &&
          <View style={styles.viewWinner}>      
            <Text style={[{fontSize: 40}, styles.text, {color: winner==="Win player X"?red:blue}]}>{winner}</Text>   
          </View>}         
        <TextButton 
          children='Begin Again'
          width={width}
          onPress={this.newGame}
        />
      </ImageBackground>
    )
  }
}
/**
 * @description Styles
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  viewContainer: {
    width: width,
    height: width,
  },
  viewSquare:{
    width: width/3,
    height: width/3,
    borderColor: black,
    borderWidth: 1,    
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },  
})