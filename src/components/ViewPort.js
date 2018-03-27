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
      randoms: setInterval(()=>{
        this.setState({
          randoms: Math.random()*(9999 - 1111) + 1111
        }) 
        if(this.props.info) {
          console.log(this.props.statusPunch, 'ini status punch')
          setTimeout(() => {
            if (this.props.info > 9 ) {
              this.setState({
                statusPower: 'Good'
              })
              return ''
            } else if(this.props.info > 6 && this.props.info < 10) {
              this.setState({
                statusPower: 'Need More Power'
              })
              return ''
            } else {
              this.setState({
                statusPower: 'Too Weak'
              })
              return ''
            } 
          },4000)
        }
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
    this.setState({
      isPractice: true
    })
    this.props.setOpcButton(0)
    this.props.setReady(this.props.type)
    this.handleReadyGo()
  }

  setDisplayPower = () => {
    if (this.props.info) {
      setTimeout(()=>{
        this.setState({
          randoms: this.props.info
        })
      },9000)
    }
   
  }

  cancelQuit = () => {
    clearTimeout(this.handleQuit)
  }

  handleQuit = () => {
    let payload = {
      type: this.props.type,
      status: this.state.statusPower,
      power: Math.round(this.props.info.toFixed())
    }
    console.log(payload, 'ini payload')
    setTimeout(()=>{
      axios.post('http://35.187.249.39:8000/log', payload, {
        headers: {
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI5MTdlZjg3ZWZkNzAwMTA5M2I2YmEiLCJuYW1lIjoiYW5ncmhhIiwiZW1haWwiOiJhbmdyaGFAZ21haWwuY29tIiwiaWF0IjoxNTIyMDc5NzI3fQ.sTzA6Sd1LxITt9ur0ni-1uWvN3zC2Xmx4NOIajm2q2Q'
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

  componentDidMount() {
    axios.get('http://35.187.249.39:8000/log', {
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI5MTdlZjg3ZWZkNzAwMTA5M2I2YmEiLCJuYW1lIjoiYW5ncmhhIiwiZW1haWwiOiJhbmdyaGFAZ21haWwuY29tIiwiaWF0IjoxNTIyMDc5NzI3fQ.sTzA6Sd1LxITt9ur0ni-1uWvN3zC2Xmx4NOIajm2q2Q'
      }
    })
      .then(response => {
        console.log(response.data.payload, 'asem')
        this.setState({
          logs: response.data.payload
        })
      })
      .catch(err => {
        console.log(err)
      })
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
          {
            this.state.readyGo <= 1 ? 
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
            <Text style={styles.test} >{this.state.readyGo -1} </Text>
          }
          {
            this.props.opacity === 1 ? (
              <View>
                <Sound
                  source={{ mp3: asset('crash.mp3') }}
                  volume={10}
                />
            {
              this.state.statusPower ?
                this.props.statusPunch ? (
                  <View>
                    <Text style={styles.randomNum}>{this.state.statusPower}</Text>
                    <VrButton
                      style={{
                        opacity: 0.9,
                        width: 0.7,
                        height: 0.7,
                        opacity: 0.5,
                        borderRadius: 0.1,
                        backgroundColor: 'black',
                        margin: 0.02,
                      }} 
                      onEnter={() => {
                        this.handleQuit()
                      }}
                    >
                      <Text>Try Again</Text>
                    </VrButton>
                  </View>
                )
                :
                (
                  <View>
                    <Text style={styles.randomNum}>You Did The Wrong Move</Text>
                    <VrButton
                      style={{
                        opacity: 0.9,
                        width: 0.7,
                        height: 0.7,
                        opacity: 0.5,
                        borderRadius: 0.1,
                        backgroundColor: 'black',
                        margin: 0.02,
                      }} 
                      onEnter={() => {
                        this.handleQuit()
                      }}
                    >
                      <Text>Try Again</Text>
                    </VrButton>
                  </View>
                )
            :
            (
              <View>
                <Text style={styles.randomNum}>{this.state.randoms.toFixed()}</Text>
                <Sound
                  source={{
                  mp3: asset('random.wav')
                  }}
                  volume={10}
                />
              </View>)
      
            }
            </View>
          ) 
            :
            (<View></View>)
          }
        
      </View> 
      )
    } else if (this.props.type === 'history' && !this.state.isPractice) {
      return (
        <View style={styles.table}>
          {
            this.state.logs.map(log => {
              return (
                <View key={log._id}>
                  <Text style={{fontSize: 0.2}}> GROAAAAAR </Text>
                  <Text style={{fontSize: 0.2}}> {log.type} </Text>
                  <Text style={{fontSize: 0.2}}> {log.power} </Text>
                  <Text style={{fontSize: 0.2}}> {log.status} </Text>
                </View>
              )
            })
          }
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
    flexDirection: 'column',
    width: 15,
    transform: [
      {translate: [-1.5, 1.7, -3]},
    ]
  }
}