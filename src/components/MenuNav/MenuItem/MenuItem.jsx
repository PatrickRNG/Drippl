import React from 'react';
import PropTypes from 'prop-types';
import { Item, Select } from './styles';

const MenuItem = ({
  type,
  text,
  value,
  name,
  selectedValue,
  onChange,
  variants,
}) => {
  const handleChange = (e) =>
    onChange({ property: name, value: e.target.value });
  const renderOption = () => {
    switch (type) {
      case 'select':
        return (
          <Select value={selectedValue} onChange={handleChange}>
            {value.map((option) => (
              <option key={option.name} value={option.value}>
                {option.name}
              </option>
            ))}
          </Select>
        );
      default:
        return (
          <input type={type} value={selectedValue} onChange={handleChange} />
        );
    }
  };

  return (
    <Item variants={variants}>
      <div>{text}</div>
      {renderOption()}
    </Item>
  );
};

MenuItem.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number,
    PropTypes.bool,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  variants: PropTypes.object.isRequired,
};

export default MenuItem;
