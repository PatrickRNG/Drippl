import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAlert } from 'react-alert';
import { Button } from 'client/components';
import { configs } from 'client/utils/config';
import {
  useConfigState,
  useConfigDispatch,
} from 'client/contexts/configContext';
import { measurementNames } from 'client/utils/constants';
import MenuItem from '../MenuItem/MenuItem';
import { List } from './styles';

const variantsItem = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
    display: 'flex',
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
    transitionEnd: {
      display: 'none',
    },
  },
};

const variantsNav = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Navigation = ({ setIsOpen }) => {
  const { options } = useConfigState();
  const dispatchConfig = useConfigDispatch();
  const [currentOptions, setCurrentOptions] = useState(options);
  const alert = useAlert();

  const handleChange = ({ property, value }) => {
    const option = { [property]: value };
    setCurrentOptions({ ...currentOptions, ...option });
  };

  useEffect(() => {
    const initialConfig = JSON.parse(localStorage.getItem('config'));
    if (initialConfig) {
      dispatchConfig({
        type: 'set',
        payload: { option: initialConfig },
      });
      setCurrentOptions((current) => ({ ...current, ...initialConfig }));
    }
  }, [dispatchConfig]);

  // If imperial metric is used, change objetive to 64 oz, else, 2000 ml
  useEffect(() => {
    const isImperial =
      currentOptions.waterMeasurements === measurementNames.IMPERIAL;
    setCurrentOptions((current) => ({
      ...current,
      objective: isImperial ? 64 : 2000,
    }));
  }, [currentOptions.waterMeasurements]);

  const handleSave = () => {
    dispatchConfig({
      type: 'set',
      payload: { option: currentOptions },
    });
    alert.show('Settings saved!');
    localStorage.setItem(
      'config',
      JSON.stringify({
        ...options,
        ...currentOptions,
      })
    );
    setIsOpen(false);
  };

  return (
    <List variants={variantsNav}>
      {configs.map((option) => {
        const selectedValue = currentOptions[option.name];
        return (
          <MenuItem
            key={option.name}
            option={option}
            selectedValue={selectedValue}
            onChange={handleChange}
            variants={variantsItem}
            currentOptions={currentOptions}
          />
        );
      })}
      <Button
        fluid
        type="button"
        variants={variantsItem}
        onClick={handleSave}
        style={{ marginTop: '16px', justifyContent: 'center' }}
      >
        Save
      </Button>
    </List>
  );
};

Navigation.propTypes = {
  setIsOpen: PropTypes.func.isRequired,
};

export default Navigation;
