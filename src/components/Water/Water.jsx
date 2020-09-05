import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { useWaterDispatch } from 'contexts/waterContext';
import { WaterCard, Button } from 'components';
import { Flex, Input } from 'common/Elements';
import { buildWaterLabel } from 'utils/water';

import { Title, Wrapper, CardWrapper, WaterNumber } from './styles';

const Water = ({ water }) => {
  const dispatch = useWaterDispatch();
  const [waterNumber, setWaterNumber] = useState(0);

  const addWater = (value) =>
    dispatch({
      type: 'add',
      payload: { water: Number(value) },
    });

  const removeWater = (index) =>
    dispatch({
      type: 'remove',
      payload: { index },
    });

  const editWater = (value, index) =>
    dispatch({
      type: 'edit',
      payload: { water: Number(value), index },
    });

  const buildButtons = (labels) =>
    labels.map((label) => {
      return (
        <Button
          key={label}
          onClick={() => setWaterNumber(waterNumber + Number(label))}
        >
          {buildWaterLabel(label)}
        </Button>
      );
    });

  const handleAddWater = (value) => {
    if (value > 0) {
      addWater(value);
      setWaterNumber(0);
    }
  };

  return (
    <div>
      <Wrapper>
        <Title>Consumption</Title>
        <Flex justify="space-between" margin="0 0 15px 0">
          {buildButtons([50, 200, 500, 1000])}
        </Flex>
        <Flex justify="space-between">
          <WaterNumber>
            <Input readOnly value={buildWaterLabel(waterNumber)} />
            <span onClick={() => setWaterNumber(0)} aria-hidden="true">
              &times;
            </span>
          </WaterNumber>
          <Button secondary onClick={() => handleAddWater(waterNumber, 'ml')}>
            Add
          </Button>
        </Flex>
      </Wrapper>
      <CardWrapper>
        <AnimatePresence>
          {water.map(({ id, value, createdAt }, index) => (
            <WaterCard
              key={id}
              layout="position"
              value={buildWaterLabel(value)}
              date={createdAt}
              editWater={(WaterValue) => editWater(WaterValue, index)}
              removeWater={() => removeWater(index)}
            />
          ))}
        </AnimatePresence>
      </CardWrapper>
    </div>
  );
};

Water.propTypes = {
  water: PropTypes.array.isRequired,
};

export default Water;
