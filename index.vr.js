import React from 'react';
// import PropTypes from 'prop-types';
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
      type: ''
    }
  }

  setRender = (type) => {
    console.log(type, 'ini di render')
    this.setState({
      type: type
    })
  }

  handleSubmit = (type) => {
    this.setRender(type)
    console.log(type, 'asddd')
    setTimeout(()=>{
      db.ref(this.state.email.split('@')[0]).set({ready:true})
      .then(() => {
        db.ref(this.state.email.split('@')[0]).child('logs').set({type: type})
      })
      .catch(err => {
        console.log(err)
      })
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
            <Text style={styles.menuButton}> INI JAB </Text>
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
            <Text style={styles.menuButton}> INI UPPERCUT </Text>
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
            <Text style={styles.menuButton}> INI HOOK </Text>
          </View>
        </View>
      )
    }
    
    
  }
};

const styles = {
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
    transform: [{translate: [-4, 1, -7]}],
  }
}

AppRegistry.registerComponent('VighteR_VR_Client', () => VighteR_VR_Client);
