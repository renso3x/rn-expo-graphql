import React, { useState } from 'react';
import { AsyncStorage, View, Image } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from '../components/TextField';

const Login = props => {
  const { mutate, history } = props;
  const [state, setState] = useState({
    values: {
      email: '',
      password: ''
    },
    isSubmitting: false
  });

  const onChangeText = (key, value) => {
    setState(state => ({
      values: {
        ...state.values,
        [key]: value.toLowerCase()
      }
    }));
  };

  const submit = async () => {
    if (state.isSubmitting) {
      return;
    }

    setState({ ...state, isSubmitting: true });

    const { email, password } = state.values;

    try {
      const response = await mutate({
        variables: { email, password }
      });

      if (response) {
        await AsyncStorage.setItem('token', response.data.login.token);
        history.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const goToSignup = () => {
    history.push('/register');
  };

  const {
    values: { email, password }
  } = state;

  return (
    <View style={styles.view}>
      <Title style={styles.title}>Login</Title>
      <View style={{ width: 350 }}>
        <TextField
          value={email}
          autoCapitalize="none"
          name="email"
          onChangeText={onChangeText}
        />
        <TextField
          value={password}
          name="password"
          onChangeText={onChangeText}
          secureTextEntry
        />
        <Button mode="contained" onPress={submit} style={styles.btn}>
          Login
        </Button>
        <Button
          mode="contained"
          onPress={goToSignup}
          color="green"
          style={styles.btn}
        >
          Register
        </Button>
      </View>
    </View>
  );
};

const styles = {
  view: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center'
  },
  btn: {
    marginTop: 10,
    marginBottom: 10
  }
};

const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      tokenExpiration
    }
  }
`;

export default graphql(loginMutation)(Login);
