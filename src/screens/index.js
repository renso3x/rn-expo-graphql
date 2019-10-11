import React from 'react';
import { StyleSheet } from 'react-native';

import { NativeRouter, Switch, Route } from 'react-router-native';

import CheckToken from '../components/CheckToken';

import Login from './Login';
import Register from './Register';
import Todos from './Todos';
import AddTodo from './AddTodo';
import ViewTodo from './ViewTodo';

const App = () => (
  <NativeRouter>
    <Switch style={styles.container}>
      <Route exact path="/" component={CheckToken} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/todos" component={Todos} />
      <Route exact path="/add-todo" component={AddTodo} />
      <Route exact path="/view-todo" component={ViewTodo} />
    </Switch>
  </NativeRouter>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  }
});

export default App;
