import React from 'react'
import {
  View,
  Text,
  Video,
  VideoControl,
  MediaPlayerState,
  VrButton,
  asset,
  Image
} from 'react-vr';
export default class Viewport extends React.Component{
  constructor(){
    super();
    this.state = {
      playerState: new MediaPlayerState({autoPlay: true, muted: true})
    };
  }
  render(){
    return (
      <View
          playerState={this.state.playerState}
          style={{
            width: 3,
            height: 2,
            backgroundColor:'grey',
            margin: 0.02,
            transform: [
              {translate: [-1.5, 1.7, -3]},
            ]
          }}
        >
        
        {this.props.type === 'jab' 
        ? (
          <View>
            <Video style={{width: 3.0, height:2.0, }} source={{uri: 'jab.mp4'}}  playerState={this.state.playerState} />
            <VideoControl 
            style={{
              height: 0.2, 
              width: 3.0,
              transform: [
                {translate: [0, 0.2, 0]},
              ]
              }} playerState={this.state.playerState} />
              <VrButton
              style={{
                height: 0.2, 
                width: 0.4,
                backgroundColor:'black',
                borderRadius: 0.1,
                transform: [
                  {translate: [1.2, 0.05, -0.5]},
                ]
                }}>
          <Text
          style={{
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