import React from 'react'
import {
  View,
  Text,
  Video,
  VrButton
} from 'react-vr';
export default class Viewport extends React.Component{
  constructor(){
    super()
  }
  render(){
    return (
      <View
      style={{
        width: 3,
        height: 2,
        backgroundColor:'grey',
        margin: 0.02,
        transform: [
          {translate: [-1.5, 1.5, -3]},
        ]
      }}>
        
        {this.props.type === 'jab' ? (<Video style={{width: 3.0, height:2.0, }} source={{uri: 'jab.mp4'}} />):(<Video style={{width: 3.0, height:2.0}} source={{uri: ''}} />)}
      </View>
    )
  }
}