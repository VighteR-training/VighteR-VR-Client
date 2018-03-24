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
      playerState: new MediaPlayerState({autoPlay: true, muted: true}),
      isPractice: false
    };
  }

  handlePractice = () => {
    console.log('masuk sini')
    this.setState({
      isPractice: true
    })
    this.props.setReady(this.props.type)
  }

  componentDidMount(){
    // setTimeout(()=>{
    //   this.setState({
    //     isPractice: false
    //   })
    //   console.log('set')
    // }, 8000)
  }

  render(){
    if (this.state.isPractice) {
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
          transform: [
            {translate:[1.02, -0.8, 0.8]}
          ]
        }}
        source={asset('demeg.png')}
        ></Image>
        {/* <VrButton
                onClick={() => this.handlePractice()}
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
          </VrButton> */}
      </View>
        
      )
    } else {
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
          
          {this.props.type 
          ? (
            <View>
              <Video style={{width: 3.0, height:2.0, }} source={{uri: this.props.videoSrc}}  playerState={this.state.playerState} />
              <VideoControl 
              style={{
                height: 0.2,
                width: 3.0,
                transform: [
                  {translate: [0, 0.2, 0]},
                ]
                }} playerState={this.state.playerState} />
                <VrButton
                onClick={() => this.handlePractice()}
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
}

const styles = {
  test: {
    fontSize: 1,
    paddingLeft: 0.2,
    paddingRight: 0.2,
    margin: 0.4,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#212121',
    fontWeight: '300',
    layoutOrigin: [0.5, 0.5],
    transform: [{translate: [0, 2, -8]}]
  },
}