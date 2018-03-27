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
        if(this.props.powerInfo && this.props.statusPunch) {
          setTimeout(() => {
            console.log('masuk ke true interval')
            if(this.props.powerInfo < 4) {
              this.setState({
                statusPower: 'Too Weak'
              })
            } 
            else if (this.props.powerInfo < 7 ) {
              this.setState({
                statusPower: 'Need More Power'
              })
            } else if(this.props.powerInfo < 11) {
              this.setState({
                statusPower: 'Good'
              })
            } else {
              this.setState({
                statusPower: 'Amazing'
              })
            }
          },4000)
        } else if(this.props.powerInfo && !this.props.statusPunch) {
          console.log(' masuk wrong')
          setTimeout(() => {
            this.setState({
              statusPower: 'You did The Wrong Move'
            })
          }, 4000)
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

  componentDidMount() {
    axios.get('http://35.187.249.39:8000/log', {
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI3ZmMzOWYzODM1NzBlYTk3ZGNjMjkiLCJuYW1lIjoiTHV0aGZpIiwiZW1haWwiOiJqa3QubHV0aGZpQGdtYWlsLmNvbSIsImlhdCI6MTUyMjEzNzU2MX0.fo7cp5Mp11STOJhVC0Al33Uw7_JBUUtOmxQZaOF3biA'
      }
    })
      .then(response => {
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
            //jika ready go kurang kurang dari atau sama dengan 1 tamplikan crash
            this.state.readyGo <= 1 ? 
              (<View>
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
              </View>)
            :
            //jika tidak tamplkan angka 1
            <Text style={styles.test} >{this.state.readyGo -1} </Text>
          }

          {
            //jika data angka power sudah ada
            this.props.opacity === 1 ? (
              <View>
                <Sound
                  source={{ mp3: asset('crash.mp3') }}
                  volume={10}
                />
            {
              //if statusPower sudah terisi
              this.state.statusPower ?

              //if statusPunch(gerakanya benar apa tidak)
                this.props.statusPunch ?

                // jika benar tampilkan status powernya (good bad to weak dll)
                 (
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
                //else status punchnya salah tampilakan wrong move
                (
                  <View>
                    <Text style={{...styles.randomNum, fontSize: 1}}>You Did The Wrong Move</Text>
                    <VrButton
                      style={{
                        opacity: 0.9,
                        width: 0.7,
                        height: 0.7,
                        opacity: 0.5,
                        borderRadius: 0.1,
                        backgroundColor: 'black',
                        margin: 0.02,
                        layoutOrigin: [0.5, 0.5],
                        transform: [
                          {translate: [-0.5, 2, -8]}
                        ]
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
            //else ini status powernya belum terisi tampilkan angka randomnya
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
          //jika opactinya selain 1 (belum terisi datanya) tampilkan view kosong
            :
            (<View></View>)
          }
        
      </View> 
      )
    } else if (this.props.type === 'history' && !this.state.isPractice) {
      return (
        <View>
          <Text style={{
            fontSize: 0.3,
            borderRadius: 0.05,
            backgroundColor: 'rgba(3, 8, 33, .7)',
            width: 10,
            textAlign: 'center',
            justifyContent: 'center',
            layoutOrigin: [0.5, 0.5],
            transform: [
              {translate: [-0.5, 2, -8]}
            ]
          }}> Logs </Text>
          <View style={styles.table}>
            {
              this.state.logs.map(log => {
                return (
                  <View key={log._id} style={{ 
                    backgroundColor: 'rgba(79, 22, 24, .7)', 
                    width: 3, 
                    margin: .1, 
                    padding: .1
                  }}>
                    <Text style={{fontSize: 0.2, textAlign: 'center'}}> Type: {log.type} </Text>
                    <Text style={{fontSize: 0.2, textAlign: 'center'}}> Power: {log.power} </Text>
                    <Text style={{fontSize: 0.2, textAlign: 'center'}}> Status: {log.status} </Text>
                  </View>
                )
              })
            }
          </View>
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
              <Video style={{width: 3.0, height:2.0, }} source={{uri: this.props.videoSrc}} />
                <VrButton
                onEnter={() => {
                  setTimeout(()=>{
                    this.handlePractice()
                  }, 2000)
                }}
                onExit={() => {
                  
                }}
                style={{
                  
                  justifyContent: 'center',
                  opacity: 0.8,
                  margin: 0.1,
                  height: 0.2, 
                  width: 3.5,
                  backgroundColor: 'rgb(21, 2, 84)',
                  transform: [
                    {translate: [-0.35, 0.05, -0.5]},
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