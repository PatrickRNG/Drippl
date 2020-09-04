import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { Button } from 'components';
import { configs } from 'utils/config';
import { useConfigState, useConfigDispatch } from 'contexts/configContext';
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

const Navigation = () => {
  const { options } = useConfigState();
  const dispatch = useConfigDispatch();
  const [currentOptions, setCurrentOptions] = useState(options);
  const alert = useAlert();

  const handleChange = ({ property, value }) => {
    const option = { [property]: Number(value) };
    setCurrentOptions({ ...currentOptions, ...option });
  };

  useEffect(() => {
    const initialConfig = JSON.parse(localStorage.getItem('config'));
    if (initialConfig) {
      dispatch({
        type: 'set',
        payload: { option: initialConfig },
      });
      setCurrentOptions({ ...currentOptions, ...initialConfig });
    }
  }, []);

  const handleSave = () => {
    dispatch({
      type: 'set',
      payload: { option: currentOptions },
    });
    alert.show('Saved!');
    localStorage.setItem(
      'config',
      JSON.stringify({
        ...options,
        ...currentOptions,
      })
    );
  };

  return (
    <List variants={variantsNav}>
      {configs.map((option) => {
        const selectedValue = currentOptions[option.name];
        return (
          <MenuItem
            key={option.name}
            type={option.type}
            text={option.text}
            name={option.name}
            value={option.value}
            selectedValue={selectedValue}
            onChange={handleChange}
            variants={variantsItem}
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

export default Navigation;
