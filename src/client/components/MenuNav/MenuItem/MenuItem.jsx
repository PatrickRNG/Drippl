import React from 'react';
import PropTypes from 'prop-types';
import { getMeasurementInitial } from 'client/utils/water';
import { Item, Select, Input } from './styles';

const MenuItem = ({
  option,
  selectedValue,
  onChange,
  variants,
  currentOptions,
}) => {
  const { type, text, name, value } = option;

  const handleChange = (property) => {
    if (value !== undefined) onChange({ property: name, value: property });
  };

  const renderOption = () => {
    switch (type) {
      case 'select':
        return (
          <Select
            value={selectedValue}
            onChange={(e) => handleChange(e.target.value)}
          >
            {value.map((config) => (
              <option key={config.name} value={config.value}>
                {config.name}
              </option>
            ))}
          </Select>
        );
      case 'checkbox':
        return (
          <Input
            type={type}
            checked={selectedValue}
            onChange={(e) => handleChange(e.target.checked)}
          />
        );
      default:
        return (
          <Input
            type={type}
            value={selectedValue}
            onChange={(e) => handleChange(e.target.value)}
          />
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
  option: PropTypes.object.isRequired,
  selectedValue: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  variants: PropTypes.object.isRequired,
  currentOptions: PropTypes.object.isRequired,
};

export default MenuItem;
