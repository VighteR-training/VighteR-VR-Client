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
      power: ''
    }
  }

  setRender = (type) => {
    this.setState({
      type: type
    })
  }

  handleSubmit = (type) => {
     let setReady = {
       ready: true,
       type: type
     }
    var splitEmail = this.state.email.split('@')[0]
    this.setRender(type)
    let splitEmail = this.state.email.split('@')[0]
    setTimeout(()=>{
      db.ref(splitEmail).set(setReady)
    }, 3000)
  }

  componentWillMount() {
    this.fetchScore()
  }

  fetchScore = () => {
    var splitEmail = this.state.email.split('@')[0]
    db.ref(splitEmail).on('value', (snapshot) => {
      let data = snapshot.val()
      if (!data.ready) {
        this.setState({
          power: data.power
        })
      }
    })
  }

  render() {
      return (
        <View>
          <Pano source={asset('chess-world.jpg')}/>
          {this.state.type === '' ? (<Viewport type={'WELCOME PLEASE SELECT TYPE'}/>) : (<Viewport info={this.state.power} type={this.state.type}/>) }
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
