import React, { Fragment } from 'react';
import { Appbar, Card, Title, Paragraph } from 'react-native-paper';

const ViewTodo = ({ history }) => {
  const _goBack = () => {
    history.goBack();
  };

  const { task } = history.location.state;

  return (
    <Fragment>
      <Appbar.Header style={{ backgroundColor: '#23aaaa' }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title="My Todos" />
      </Appbar.Header>
      <Card.Content>
        <Title>{task.note}</Title>
        <Paragraph>{task.date}</Paragraph>
      </Card.Content>
    </Fragment>
  );
};

export default ViewTodo;
