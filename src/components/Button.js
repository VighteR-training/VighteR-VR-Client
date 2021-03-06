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

class Button extends React.Component {

  constructor(props) {
    super();

    this.state = {
      animatedTranslation: new Animated.Value(0),
      clickProgress: null
    };
  }
  animateIn = () => {
    Animated.timing(
      this.state.animatedTranslation,
      {
        toValue: 0.125,
        duration: 100,
        easing: Easing.in,
      }
    ).start();
    this.setState({
      clickProgress: setTimeout(() => {
        this.props.handleSubmit(this.props.animateType)
      }, 3000)
    })
  }

  animateOut = () => {
    Animated.timing(
      this.state.animatedTranslation,
      {
        toValue: 0,
        duration: 100,
        easing: Easing.in,
      }
    ).start();
    clearTimeout(this.state.clickProgress)
  }

  onButtonClick = () => {
    this.props.onClick();
  }
  componentWillMount(){
    
  }

  render () {
    let val = this.props.animate
    return (
      <Animated.View
      style={{
        alignItems: 'center',
        flexDirection: 'row',
        margin: 0.0125,
        transform: [
          {translateZ: this.state.animatedTranslation},
        ],
        width: 0.7,
      }}
      >

        <VrButton
        style={{
          opacity: 0.9,
          width: 0.7,
          height: 0.7,
          opacity: this.props.opcButton,
          borderRadius: 0.07,
          backgroundColor: 'rgb(0, 0, 0)',
          margin: 0.05,
        }} 
        onEnterSound={{
          wav: asset('select.wav')
        }}
        onClick={() => this.props.handleSubmit(`${this.props.animateType}`)}
        onEnter={() => this.animateIn()}
        onExit={() => this.animateOut()}>

          <Text
            style={{
              marginLeft:0.1
            }}> {this.props.animateType} </Text>

          <Image
          style={{
            width: 0.5,
            height: 0.5,
          }}
          source={asset(this.props.img)}
          >
          </Image>

      </VrButton>

    </Animated.View>
    );
  }
};

module.exports = Button;
