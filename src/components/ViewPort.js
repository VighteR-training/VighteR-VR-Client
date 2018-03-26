import React from 'react'
import {
  View,
  Text,
  Video,
  VideoControl,
  MediaPlayerState,
  VrButton,
  asset,
  Image,
  Animated,
  Sound
} from 'react-vr';
import { setTimeout } from 'core-js/library/web/timers';

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
      isReadyGo: 4,
      truePower: false,
      slideValue: new Animated.Value(0),
      randoms: setInterval(()=>{
        this.setState({
          randoms: Math.random()*(9999 - 1111) + 1111
        }) 
      }, 50)
    };
  }

  handleReadyGo = () => {
    let countDown = setInterval(()=>{
      
      this.setState({
        readyGo: this.state.readyGo - 1
      })
      console.log(this.state.readyGo)
    }, 1000)
    setTimeout(() => {
      clearInterval(countDown)
    }, 3000)
  }

  handlePractice = () => {
    console.log('masuk sini')
    this.setState({
      isPractice: true
    })
    this.props.setOpcButton(0)
    this.props.setReady(this.props.type)
    this.handleReadyGo()
  }

  animateIn = () => {
    Animated.timing(
      this.state.slideValue,
      {
        toValue: 0,
        duration: 1000,
        delay: 1000,
        easing: Easing.bounce
      }
    )
  }

  componentDidMount(){
    console.log(this.props.info, 'ini power')
    if(this.props.info) {
      this.setState({
        truePower: this.props.info
      })
    }
    // this.state.powerAnimation.setValue(-20)
    // console.log(this.state.readyGo)
    // let a = setInterval(()=>{
    //   this.setState({
    //     readyGo: this.state.readyGo--
    //   })
    //   console.log('set')
    // }, 1000)
    // if (this.state.readyGo <= 0) {
    //   console.log('berenti')
    //   clearInterval(a)
    // } else {
      
    // }
    

  }
  render(){
    if (this.state.isPractice ) {
      
      return (
        <View
        style={{
          width: 3,
          height: 2,
          margin: 0.02,
          transform: [
            {translate: [-1.5, 1.7, -3]},
          ]
        }}
      >
      {this.state.readyGo <= 1 ? 
        <View>
        <Image 
        style={{
          width: 1,
          height: 1,
          opacity: this.props.opacity,
          transform: [
            {translate:[1.02, -0.8, 0.8]}
          ]
        }}
        source={asset('demeg.png')}
        >
        </Image>
      </View>
      :
      <Text
      style={styles.test}
      >{this.state.readyGo -1}</Text>
      }
      {
        this.props.opacity === 1 ? 
        <View>
        <Sound
        source={{
        mp3: asset('crash.mp3')
        }}
        volume={10}
      />
      <Text style={styles.randomNum}>{this.state.randoms.toFixed()}</Text>
      <Sound
        source={{
        mp3: asset('random.wav')
        }}
        volume={10}
      />
      </View> 
      :
      <View></View>
      }
        {/* <VrButton
                onClick={() => this.handlePractice()}
                style={{
                  height: 0.2, 
                  width: 0.4,
                  backgroundColor:'black',
                  borderRadius: 0.1,
                  transform: [
                    {translate: [1.2, 0.05, -0.5]},
                  ]
                  }}>
            <Text
            style={{
              transform: [
                {translate: [0.04, -0.01, 0]},
              ]
              }}
            >Practice</Text>
          </VrButton> */}
      </View>
        
      )
    } else {
      return (
        <View
            playerState={this.state.playerState}
            style={{
              width: 3,
              height: 2,
              opacity: 0.9,
              backgroundColor:'grey',
              borderRadius: 0.1,
              margin: 0.02,
              transform: [
                {translate: [-1.5, 1.7, -3]},
              ]
            }}
          >
          
          {this.props.type 
          ? (
            <View>
              <Video style={{width: 3.0, height:2.0, }} source={{uri: this.props.videoSrc}}  playerState={this.state.playerState} />
              <VideoControl 
              style={{
                height: 0.2,
                width: 3.0,
                transform: [
                  {translate: [0, 0.2, 0]},
                ]
                }} />
                <VrButton
                onEnter={() => {
                  setTimeout(()=>{
                    this.handlePractice()
                  }, 2000)
                }}
                style={{
                  height: 0.2, 
                  width: 0.4,
                  backgroundColor:'black',
                  borderRadius: 0.1,
                  transform: [
                    {translate: [1.2, 0.05, -0.5]},
                  ]
                  }}>
            <Text
            style={{
              transform: [
                {translate: [0.04, -0.01, 0]},
              ]
              }}
            >Practice</Text>
          </VrButton>
            </View>
          )
          :
          (
          <Video style={{width: 3.0, height:2.0}} source={{uri: ''}} />)
          }
          
        </View>
      )
    }
  
  }
}

const styles = {
  randomNum: {
    width: 5,
    fontSize: 2,
    fontWeight: 'bold',
    layoutOrigin: [0.05, 0.5],
    transform: [{translate: [0, 0, -8]}]
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
  }
}