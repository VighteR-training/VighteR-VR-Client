import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  Text,
  VrButton,
  Video
} from 'react-vr';

const Easing = require('Easing');
import AnimationPunch from './AnimationPunch'
class CountDown extends React.Component {

  constructor(props) {
    super();

    this.state = {
    };
  }

  render() {
    if (this.props.readyGo > 1) {
      return <Text style={styles.test}>{this.props.readyGo -1}</Text>
    } else {
      return <AnimationPunch type={this.props.type} statusPunch={this.props.statusPunch} powerInfo={this.props.powerInfo} opacity={this.props.opacity} />
    }
    
  }
};

module.exports = CountDown;

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
    fontSize: 3,
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