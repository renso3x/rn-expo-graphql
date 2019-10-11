import React, { Component } from 'react';
import { AsyncStorage, Text } from 'react-native';

class CheckToken extends Component {
  componentDidMount = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      this.props.history.push('/login');
      return;
    }
    this.props.history.push('/todos');
  };

  render() {
    return <Text>loading...</Text>;
  }
}

export default CheckToken;
