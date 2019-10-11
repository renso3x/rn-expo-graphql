import React from 'react';
import PropTypes from 'prop-types';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const Todo = task => {
  const { date, note, handleView, handleDelete } = task;
  const onView = () => {
    handleView(task);
  };
  const onDelete = () => {
    handleDelete(task);
  };
  return (
    <Card>
      <Card.Content>
        <Title>{note}</Title>
        <Paragraph>{date}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onView} icon="view-list">
          View
        </Button>
        <Button onPress={onDelete} icon="delete">
          Remove
        </Button>
      </Card.Actions>
    </Card>
  );
};

Todo.propTypes = {
  task: PropTypes.shape({
    date: PropTypes.string.isRequired,
    note: PropTypes.string.isRequired,
    handleView: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
  })
};

export default Todo;
