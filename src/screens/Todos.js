import React, { Fragment } from 'react';
import { FlatList, AsyncStorage } from 'react-native';
import { Title, Appbar } from 'react-native-paper';
import { graphql, withApollo } from 'react-apollo';
import { compose } from 'recompose';
import gql from 'graphql-tag';

import Todo from '../components/Todo';

const Todos = props => {
  const {
    data: { tasks, loading },
    history,
    mutate,
    client
  } = props;
  const onHandleView = task => {
    history.push('/view-todo', {
      task
    });
  };

  const onHandleDelete = task => {
    mutate({
      variables: {
        taskId: task.id
      },
      refetchQueries: ['getTasks']
    });
  };

  const addNewTodo = () => {
    history.push('/add-todo');
  };

  const handleLogout = async () => {
    await AsyncStorage.setItem('token', '');
    client.resetStore();
    history.push('/login');
  };

  const renderList = (
    <FlatList
      keyExtractor={item => item.toString()}
      data={tasks}
      renderItem={({ item }) => (
        <Todo
          {...item}
          handleView={onHandleView}
          handleDelete={onHandleDelete}
        />
      )}
    />
  );

  return (
    <Fragment>
      <Appbar.Header style={{ backgroundColor: '#23aaaa' }}>
        <Appbar.Content title="My Todos" />
        <Appbar.Action icon="add" onPress={addNewTodo} />
        <Appbar.Action icon="exit-to-app" onPress={handleLogout} />
      </Appbar.Header>
      {loading && !tasks ? <Title>Fetching...</Title> : renderList}
    </Fragment>
  );
};

export const taskQuery = gql`
  query getTasks {
    tasks {
      id
      date
      note
    }
  }
`;

export const removeTaskMutation = gql`
  mutation removeTaskMutation($taskId: Int!) {
    removeTask(taskId: $taskId)
  }
`;

export default withApollo(
  compose(
    graphql(taskQuery),
    graphql(removeTaskMutation)
  )(Todos)
);
