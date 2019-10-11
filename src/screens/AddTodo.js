import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { taskQuery } from './Todos';

import Form from '../components/Form';

const AddTodo = ({ mutate, history }) => {
  const handleSubmit = async values => {
    const response = await mutate({
      variables: values,
      update: (store, { data: { createTask } }) => {
        const data = store.readQuery({ query: taskQuery });
        data.tasks.push(createTask);
        store.writeQuery({ query: taskQuery, data });
      }
    });

    if (response) {
      history.goBack();
    }
  };

  return <Form onSubmitTodo={handleSubmit} goBack={history.goBack} />;
};

const createTasks = gql`
  mutation createTask($note: String!, $date: String!) {
    createTask(note: $note, date: $date) {
      id
      note
      date
    }
  }
`;

export default graphql(createTasks)(AddTodo);
