import React from 'react';
import PropTypes from 'prop-types';
import { getMeasurementInitial } from 'client/utils/water';
import { Item, Select, Input } from './styles';

const MenuItem = ({
  type,
  text,
  value,
  name,
  selectedValue,
  onChange,
  variants,
  currentOptions,
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
          <Input type={type} value={selectedValue} onChange={handleChange} />
        );
    }
  };

  const renderOptionNames = (optionName) => {
    switch (optionName) {
      case 'objective':
        return (
          <div>
            {text} (in {getMeasurementInitial(currentOptions.waterMeasurements)}
            )
          </div>
        );
      default:
        return <div>{text}</div>;
    }
  };

  return (
    <Item variants={variants}>
      {renderOptionNames(name)}
      {renderOption()}
    </Item>
  );
};

MenuItem.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  selectedValue: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  variants: PropTypes.object.isRequired,
  currentOptions: PropTypes.object.isRequired,
};

export default MenuItem;
