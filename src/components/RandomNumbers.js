import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  Text,
  VrButton,
  Video,
  Sound
} from 'react-vr';

const Easing = require('Easing');
import AnimationPunch from './AnimationPunch'
class RandomNumbers extends React.Component {

  constructor(props) {
    super();

    this.state = {
      randomNumbers: setInterval(()=>{
        this.setState({
          randomNumbers: Math.random()*(9999 - 1111) + 1111
        })
      },50) 
    };
  }

  render() {
    return (
      <View>
      <Text style={styles.randomNum}>{this.state.randomNumbers.toFixed()}</Text>
      <Sound
        source={{
        mp3: asset('random.wav')
        }}
        volume={10}
      />
    </View>
    )
  }
};

module.exports = RandomNumbers;

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