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
import axios from 'axios'
const Easing = require('Easing');

class VideoBoxing extends React.Component {

  constructor(props) {
    super();

    this.state = {
      logs: []
    };
  }

  componentWillMount() {
    axios.get('http://35.187.249.39:8000/log', {
      headers: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWI3ZmMzOWYzODM1NzBlYTk3ZGNjMjkiLCJuYW1lIjoiTHV0aGZpIiwiZW1haWwiOiJqa3QubHV0aGZpQGdtYWlsLmNvbSIsImlhdCI6MTUyMjEzNzU2MX0.fo7cp5Mp11STOJhVC0Al33Uw7_JBUUtOmxQZaOF3biA'
      }
    })
      .then(response => {
        this.setState({
          logs: response.data.payload
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render () {
    if(this.props.type === 'history') {
      return (
        <View>
        <Text style={{
          fontSize: 0.3,
          borderRadius: 0.05,
          backgroundColor: 'rgba(3, 8, 33, .7)',
          width: 10,
          textAlign: 'center',
          justifyContent: 'center',
          layoutOrigin: [0.5, 0.5],
          transform: [
            {translate: [-0.5, 2, -8]}
          ]
        }}> Logs </Text>
        <View style={styles.table}>
          {
            this.state.logs.map(log => {
              return (
                <View key={log._id} style={{ 
                  backgroundColor: 'rgba(79, 22, 24, .7)', 
                  width: 3, 
                  margin: .1, 
                  padding: .1
                }}>
                  <Text style={{fontSize: 0.2, textAlign: 'center'}}> Type: {log.type} </Text>
                  <Text style={{fontSize: 0.2, textAlign: 'center'}}> Power: {log.power} </Text>
                  <Text style={{fontSize: 0.2, textAlign: 'center'}}> Status: {log.status} </Text>
                </View>
              )
            })
          }
        </View>
      </View>
      )
    } else {
      return (
          <Video style={{width: 3.0, height:2.0, }} source={{uri: this.props.videoSrc}} />    
      )
    }
    
  }
};

module.exports = VideoBoxing;

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
      {translate: [-0.5, 1, -6]}
    ]
  }
}