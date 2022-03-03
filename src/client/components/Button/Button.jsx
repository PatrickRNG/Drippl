import propTypes from 'prop-types';
import React from 'react';
import { Button as StyledButton } from './styles';

const Button = ({ fluid = false, secondary = false, ...rest }) => (
  <StyledButton $fluid={fluid} $secondary={secondary} {...rest} />
);

Button.propTypes = {
  fluid: propTypes.bool,
  secondary: propTypes.bool,
};

Button.defaultProps = {
  fluid: false,
  secondary: false,
};

export default Button;
