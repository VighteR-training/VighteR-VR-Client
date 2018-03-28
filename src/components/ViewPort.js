import React from 'react'
import {
  View,
  Text,
  Video,
  VideoControl,
  MediaPlayerState,
  NativeModules,
  VrButton,
  asset,
  Image,
  Animated,
  Sound
} from 'react-vr';
import axios from 'axios'
import VideoBoxing from './Video'
import CountDown from './CountDown'
const Easing = require('Easing');
export default class Viewport extends React.Component{
  constructor(){
    super();
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true}),
      isPractice: false,
      isPunched: true,
      opc: new Animated.Value(0),
      readyGo: 4,
      truePower: false,
      slideValue: new Animated.Value(0),
      showPower: null,
      statusPower: null,
      logs: [],
    };
  }

  handleReadyGo = () => {
    let countDown = setInterval(()=>{
      
      this.setState({
        readyGo: this.state.readyGo - 1
      })
    }, 1000)
    setTimeout(() => {
      clearInterval(countDown)
    }, 3000)

  }

  animateIn = () => {
    // Animated.timing(
    //   this.state.animatedTranslation,
    //   {
    //     toValue: 0.125,
    //     duration: 100,
    //     easing: Easing.in,
    //   }
    // ).start();
    this.setState({
      isPractice: setTimeout(() => {
        this.handlePractice()
      }, 3000)
    })
  }

  animateOut = () => {
    // Animated.timing(
    //   this.state.animatedTranslation,
    //   {
    //     toValue: 0,
    //     duration: 100,
    //     easing: Easing.in,
    //   }
    // ).start();
    clearTimeout(this.state.isPractice)
  }

  handlePractice = () => {
    this.setState({
      isPractice: true
    })
    this.props.setOpcButton(0)
    this.props.setReady(this.props.type)
    this.handleReadyGo()
  }

  cancelQuit = () => {
    clearTimeout(this.handleQuit)
  }

  handleQuit = () => {
    let payload = {
      type: this.props.type,
      status: this.state.statusPower,
      power: Math.round(this.props.powerInfo.toFixed())
    }
    setTimeout(()=>{
      axios.post('http://35.187.249.39:8000/log', payload, {
        headers: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI3ZmMzOWYzODM1NzBlYTk3ZGNjMjkiLCJuYW1lIjoiTHV0aGZpIiwiZW1haWwiOiJqa3QubHV0aGZpQGdtYWlsLmNvbSIsImlhdCI6MTUyMjEzNzU2MX0.fo7cp5Mp11STOJhVC0Al33Uw7_JBUUtOmxQZaOF3biA'
        }
      })
        .then(response => {
          NativeModules.LinkingManager.openURL('http://localhost:8081/vr/')
        })
        .catch(err => {
          console.log(err)
        })
    }, 2000)
  }

  render(){
    if(this.state.isPractice !== true) {
      return (
        <View
        style={{
          width: 3,
          height: 2,
          opacity: 0.9,
          borderRadius: 0.1,
          margin: 0.02,
          transform: [
            {translate: [-1.5, 1.7, -6]},
          ]
        }}
        >
          <VideoBoxing dataLogs={this.state.logs} type={this.props.type} videoSrc={this.props.videoSrc} />
          {
            this.props.type !== 'history' ? 
              (<VrButton
                onEnter={() => {
                  this.animateIn()
                }}
                onExit={() => {
                  this.animateOut()
                }}
                style={{
                
                justifyContent: 'center',
                opacity: 0.8,
                margin: 0.1,
                height: 0.2, 
                width: 3.5,
                backgroundColor: 'rgb(21, 2, 84)',
                transform: [
                  {translate: [-0.35, 0.05, -1]},
                ]
                }}>
                <Text
                  style={{
      
                  textAlign: 'center',
                  width: 3.5,
                  transform: [
                    {translate: [0.04, -0.01, 0]},
                  ]
                  }}
                >
                  Practice
                </Text>
              </VrButton>)
            :
              (<View></View>)
          
          }
      </View>
      )
    } else if(this.state.isPractice === true) {
      return (
        <CountDown type={this.props.type} statusPunch={this.props.statusPunch} powerInfo={this.props.powerInfo} opacity={this.props.opacity} readyGo={this.state.readyGo}/>
      )
    }
  }
}

const styles = {
  randomNum: {
    textShadowColor:'#FF0000',
    width: 5,
    fontSize: 2,
    fontWeight: 'bold',
    layoutOrigin: [0.05, 0.5],
    transform: [{translate: [0, -2, -8]}]
  },
  test: {
    fontSize: 10,
    paddingLeft: 0.2,
    paddingRight: 0.2,
    margin: 0.4,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: '300',
    layoutOrigin: [0.5, 0.5],
    transform: [{translate: [0, 2, -8]}]
  },
  testing: {
    paddingLeft: 0.2,
    paddingRight: 0.2,
    margin: 0.4,
    layoutOrigin: [0.5, 0.5],
    transform: [{translate: [0, 2, -8]}]    
  },
  table: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: -1,
    justifyContent: 'center',
    width: 16,
    layoutOrigin: [0.5, 0.5],
    transform: [
      {translate: [-0.5, 0.8, -8]}
    ]
  }
}