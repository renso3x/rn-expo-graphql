import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import TextField from '../components/TextField';

const Register = props => {
  const { mutate, history } = props;
  const [state, setState] = useState({
    values: {
      firstName: '',
      lastName: '',
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

    const { email, password, firstName, lastName } = state.values;

    try {
      const response = await mutate({
        variables: { firstName, lastName, email, password }
      });

      console.log(response);
      if (response) {
        history.push('/login');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const _goToLogin = () => history.push('/login');

  const {
    values: { email, password, firstName, lastName }
  } = state;

  return (
    <View style={styles.view}>
      <Title style={styles.title}>Register</Title>
      <View style={{ width: 350 }}>
        <TextField
          value={firstName}
          autoCapitalize="none"
          name="firstName"
          placeHolder="First Name"
          onChangeText={onChangeText}
        />
        <TextField
          value={lastName}
          autoCapitalize="none"
          name="lastName"
          placeHolder="Last Name"
          onChangeText={onChangeText}
        />
        <TextField
          value={email}
          autoCapitalize="none"
          name="email"
          placeHolder="Email"
          onChangeText={onChangeText}
        />
        <TextField
          value={password}
          name="password"
          placeHolder="Password"
          onChangeText={onChangeText}
          secureTextEntry
        />
        <Button mode="contained" onPress={submit} style={styles.btn}>
          Submit
        </Button>
        <Button
          mode="contained"
          color="blue"
          onPress={_goToLogin}
          style={styles.btn}
        >
          Already have an account
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
    margin: 10
  }
};

const signInMutation = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      firstName
      lastName
    }
  }
`;

export default graphql(signInMutation)(Register);
