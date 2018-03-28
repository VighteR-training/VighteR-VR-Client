import React from 'react';
import {
  Animated,
  asset,
  Image,
  View,
  Text,
  VrButton,
  Video,
  NativeModules,
  Sound
} from 'react-vr';
import axios from 'axios'
const Easing = require('Easing');
import RandomNumbers from './RandomNumbers'
class AnimationPunch extends React.Component {

  constructor(props) {
    super();
    this.state = {
      statusPower: null,
      tryAgainProgress: null
    }
  }

  tryAgainFocusIn = () => {
    this.setState({
      tryAgainProgress: setTimeout(() => {
        this.tryAgain()
      }, 3000)
    })
  }

  tryAgainFocusOut = () => {
    clearTimeout(this.state.tryAgainProgress)
  }

  tryAgain = () => {
    let payload = {
      type: this.props.type,
      status: this.state.statusPower,
      power: Math.round(+this.props.powerInfo.toFixed())
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

  convertNilai = () => {
      if(this.props.statusPunch){
        setTimeout(() => {
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
    }else{
      setTimeout(() => {
        this.setState({
          statusPower: 'You did The Wrong Move'
        })
      }, 4000)
    };
  }

  render() {
    if (this.props.opacity === 1) {
      this.convertNilai()
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
          <Sound
          source={{ mp3: asset('crash.mp3') }}
          volume={10}
          />
        {!this.state.statusPower ? 
          (<RandomNumbers />) 
          : 
          (
            <View>
              <Text style={{...styles.randomNum, fontSize: 1}}>{this.state.statusPower}</Text>
              <VrButton
                style={{
                  opacity: 0.9,
                  width: 2,
                  height: 2,
                  opacity: 0.9,
                  borderRadius: 0.1,
                  backgroundColor: 'black',
                  margin: 0.02,
                  layoutOrigin: [0.5, 0.5],
                  transform: [
                    {translate: [2, -3, -12]}
                  ]
                }} 
                onEnter={() => {
                  this.tryAgainFocusIn()
                }}
                onExit={() => {
                  this.tryAgainFocusOut()
                }}
              >
                <Text style={{fontSize: 0.4, textAlign: 'center'}}>Try Again</Text>
              </VrButton>
            </View>
          )
        }
      </View>
      )
    } else {
      return (
          <Text style={styles.test}>PUNCH!</Text>
      )
    }
  }
};

module.exports = AnimationPunch;

const styles = {
  randomNum: {
    textShadowColor:'#FF0000',
    width: 5,
    fontSize: 0.2,
    fontWeight: 'bold',
    layoutOrigin: [0.05, 0.5],
    transform: [{translate: [0, -2, -8]}]
  },
  test: {
    fontSize: 1,
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