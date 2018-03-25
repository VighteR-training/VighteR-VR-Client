import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Alert,
  Box,
  Image,
  Animated,
  Sound,
  MediaPlayerState
} from 'react-vr';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router';
import Viewport from './src/components/ViewPort'
import Button from './src/components/Button'
import db from './firebase'
const Easing = require('Easing');
config = {sound: asset('select.wav'), playerState: new MediaPlayerState({})}
export default class VighteR_VR_Client extends React.Component {
  constructor() {
    super()
    this.state = {
      email: 'vlootfie@gmail.com',
      type: '',
      selectSound: 'select.wav',
      buttonAnimate: [
        {
          animateType: 'jab',
          img:'jab.png'
        },
        {
          animateType:'uppercut',
          img:'uppercut.png'
        },
        {
          animateType:'hook',
          img:'hook.png'
        },
        {
          animateType:'history',
          img:'history.png'
        }
      ],
      gyroscope: {
        x: null,
        y: null,
        z: null
      },
      power: '',
      isPractice: false,
      opc: 0,
      opcButton: 1,
    }
  }

  setPractice = () => {
    this.setState({
      isPractice: true
    })
  }

  setRender = (type) => {
    this.setState({
      type: type
    })
  }

  handleSubmit = (type) => {
     
    this.setRender(type)
    
  }

  setReady = (type) => {
    let setReady = {
      ready: true,
      type: type
    }
   let splitEmail = this.state.email.split('@')[0]
    setTimeout(()=>{
      db.ref(splitEmail).set(setReady)
      console.log('yes')
    })
  }

  setOpcButton = (num) => {
    this.setState({
      opcButton: num 
    })
  }

  componentWillMount() {
    let splitEmail = this.state.email.split('@')[0]
    db.ref(splitEmail).set({power: null, ready: false})
    this.fetchScore()
  }

  fetchScore = () => {
    let arr = []
    let splitEmail = this.state.email.split('@')[0]
    db.ref(splitEmail).on('value', (snapshot) => {
      let data = snapshot.val()
      if (!data.ready) {
        this.setState({
          power: data.power,
          opc: this.state.opc += 0.3
        })
        console.log(this.state.power, this.state.opc)
      }
    })
  }

  render() {
      return (
        <View>
          <Pano source={asset('chess-world.jpg')}/>
          {
            this.state.type === '' ? (<Viewport/>) :
            this.state.type === 'jab' ? (<Viewport setOpcButton={this.setOpcButton} anim={this.state.opc} setReady={this.setReady} info={this.state.power} type={this.state.type} videoSrc={'jab.mp4'}/>) :
            this.state.type === 'uppercut' ? (<Viewport setOpcButton={this.setOpcButton} setReady={this.setReady} info={this.state.power} type={this.state.type} videoSrc={'uppercut.mp4'}/>) :
            this.state.type === 'hook' ? (<Viewport setOpcButton={this.setOpcButton} setReady={this.setReady} info={this.state.power} type={this.state.type} videoSrc={'hook.mp4'}/>) :
            (<Viewport setOpcButton={this.setOpcButton} info={this.state.power} type={this.state.type} videoSrc={'history.mp4'}/>)
          }
          <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            transform: [
              {rotateX: -12},
              {translate: [-1.5, 2, -3]},
            ],
            width: 3,
          }}
          >
          {
            this.state.buttonAnimate.map((animation, idx) => {
              return (
                <Button
                opcButton={this.state.opcButton}
                key={idx}
                handleSubmit={this.handleSubmit}
                animateType={animation.animateType} 
                img={animation.img} 
                />
              )
            })
          }  
          </View>
        </View>
      );
    }
};

const styles = {
  test: {
    fontSize: 0.5,
    paddingLeft: 0.2,
    paddingRight: 0.2,
    margin: 0.4,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
  },
  menuButton: {
    margin: 0.1,
    backgroundColor: '#EF5350',
    fontSize: 0.5,
    fontWeight: '300',
    layoutOrigin: [0.5, 0.5],
    paddingLeft: 0.2,
    paddingRight: 0.2,
    textAlign: 'center',
    textAlignVertical: 'center',
    transform: [{translate: [-6, 2, -8]}, {rotateY: 35}],
  },
  video: {
    backgroundColor: '#80D8FF',
    layoutOrigin: [0.8, 1],
    width: 6,
    height: 4,
    transform: [{translate: [7, 2, -8]}, {rotateY: -35}],   
  }
}

AppRegistry.registerComponent('VighteR_VR_Client', () => VighteR_VR_Client);
