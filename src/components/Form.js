import moment from 'moment';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import DateTimePicker from 'react-native-modal-datetime-picker';
import TextField from '../components/TextField';

const Form = ({ onSubmitTodo, goBack }) => {
  const [state, setState] = useState({
    values: {
      note: ''
    },
    isDateTimePickerVisible: false,
    isSubmitting: false
  });

  const [date, setDate] = useState('');

  const showDateTimePicker = () => {
    setState({ ...state, isDateTimePickerVisible: true });
  };

  const hideDateTimePicker = () => {
    setState({ ...state, isDateTimePickerVisible: false });
  };

  const handleDatePicked = dt => {
    setDate(moment(dt).format('MM-DD-YYYY'));
    hideDateTimePicker();
  };

  const onChangeText = (key, value) => {
    setState(state => ({
      values: {
        ...state.values,
        [key]: value
      }
    }));
  };

  const handleSubmit = async () => {
    if (state.isSubmitting) {
      return;
    }
    onSubmitTodo({
      note: state.values.note,
      date
    });
  };

  const {
    values: { note }
  } = state;

  return (
    <View style={styles.view}>
      <View style={{ width: 350 }}>
        <TextField value={note} name="note" onChangeText={onChangeText} />
        <Text>Selected Date: {date}</Text>
        <Button
          onPress={showDateTimePicker}
          mode="contained"
          style={styles.btn}
        >
          Pick a Date
        </Button>
        <DateTimePicker
          isVisible={state.isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={hideDateTimePicker}
        />
        <Button
          onPress={handleSubmit}
          style={styles.btn}
          color="green"
          mode="contained"
        >
          Submit
        </Button>
        <Button
          onPress={goBack}
          style={styles.btn}
          color="blue"
          mode="contained"
        >
          Back
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
  btn: {
    marginTop: 10,
    marginBottom: 10
  }
};

Form.propTypes = {
  onSubmitTodo: PropTypes.func.isRequired,
  goBack: PropTypes.func.isRequired
};

export default Form;
