import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from './styles';

const AlertTemplate = ({ style, message, close }) => (
  <Alert style={style}>
    {message}
    <button className="close" type="button" onClick={close}>
      &times;
    </button>
  </Alert>
);

AlertTemplate.propTypes = {
  style: PropTypes.any.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default AlertTemplate;
