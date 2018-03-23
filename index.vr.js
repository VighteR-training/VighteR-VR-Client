import React from 'react';
import {
  AppRegistry,
  asset,
  Pano,
  Text,
  View,
  VrButton,
  Alert
} from 'react-vr';
import { MemoryRouter, Redirect, Route, Switch } from 'react-router';

import db from './firebase'

export default class VighteR_VR_Client extends React.Component {
  constructor() {
    super()
    this.state = {
      email: 'vlootfie@gmail.com',
      type: '',

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
    this.setRender(type)
    let splitEmail = this.state.email.split('@')[0]
    setTimeout(()=>{
      db.ref(splitEmail).set(setReady)
    }, 3000)
  }

  render() {
    if (this.state.type === '') {
      return (
        <View>
          <Pano source={asset('4k.jpg')}/>
          <View>
            <VrButton onClick={() => this.handleSubmit('jab')}>
              <Text style={styles.menuButton}> Jab </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('uppercut')}>
              <Text style={styles.menuButton}> Uppercut </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('hook')}>
              <Text style={styles.menuButton}>Hook</Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('history')}>
              <Text style={styles.menuButton}>History</Text>
            </VrButton>
          </View>
        </View>
      );
    } else if (this.state.type === 'jab') {
      return (
        <View>
          <Pano source={asset('4k.jpg')}/>
          <View>
            <VrButton onClick={() => this.handleSubmit('jab')}>
              <Text style={styles.menuButton}> Jab </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('uppercut')}>
              <Text style={styles.menuButton}> Uppercut </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('hook')}>
              <Text style={styles.menuButton}>Hook</Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('history')}>
              <Text style={styles.menuButton}>History</Text>
            </VrButton>
          </View>
          {/* bakal taro video */}
          <View style={styles.video}>
            <Text style={styles.test}> INI JAB </Text>
          </View>
        </View>
      )
    } else if (this.state.type === 'uppercut') {
      return (
        <View>
          <Pano source={asset('4k.jpg')}/>
          <View>
            <VrButton onClick={() => this.handleSubmit('jab')}>
              <Text style={styles.menuButton}> Jab </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('uppercut')}>
              <Text style={styles.menuButton}> Uppercut </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('hook')}>
              <Text style={styles.menuButton}>Hook</Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('history')}>
              <Text style={styles.menuButton}>History</Text>
            </VrButton>
          </View>
          {/* bakal taro video */}
          <View style={styles.video}>
            <Text style={styles.test}> INI UPPERCUT </Text>
          </View>
        </View>
      )
    } else if (this.state.type === 'hook') {
      return (
        <View>
          <Pano source={asset('4k.jpg')}/>
          <View>
            <VrButton onClick={() => this.handleSubmit('jab')}>
              <Text style={styles.menuButton}> Jab </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('uppercut')}>
              <Text style={styles.menuButton}> Uppercut </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('hook')}>
              <Text style={styles.menuButton}>Hook</Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('history')}>
              <Text style={styles.menuButton}>History</Text>
            </VrButton>
          </View>
          {/* bakal taro video */}
          <View style={styles.video}>
            <Text style={styles.test}> INI HOOK </Text>
          </View>
        </View>
      )
    } else if (this.state.type === 'history') {
      return (
        <View>
          <Pano source={asset('4k.jpg')}/>
          <View>
            <VrButton onClick={() => this.handleSubmit('jab')}>
              <Text style={styles.menuButton}> Jab </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('uppercut')}>
              <Text style={styles.menuButton}> Uppercut </Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('hook')}>
              <Text style={styles.menuButton}>Hook</Text>
            </VrButton>
            <VrButton onClick={() => this.handleSubmit('history')}>
              <Text style={styles.menuButton}>History</Text>
            </VrButton>
          </View>
          {/* bakal taro video */}
          <View style={styles.video}>
            <Text style={styles.test}> INI History </Text>
          </View>
        </View>
      )
    }
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
