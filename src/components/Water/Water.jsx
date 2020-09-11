import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence } from 'framer-motion';
import { useWaterDispatch } from 'contexts/waterContext';
import { useConfigState } from 'contexts/configContext';
import { WaterCard, Button } from 'components';
import { Flex, Input } from 'common/Elements';
import { buildWaterLabel } from 'utils/water';
import { measurementType } from 'utils/constants';
import { Title, Wrapper, CardWrapper, WaterNumber } from './styles';

const Water = ({ water }) => {
  const dispatch = useWaterDispatch();
  const [waterNumber, setWaterNumber] = useState(0);
  const {
    options: { waterMeasurements },
  } = useConfigState();

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

  const getButtonLabels = (type) => {
    const metric = measurementType.METRIC.map((label) => ({
      name: buildWaterLabel(label.name),
      value: label.value,
    }));
    switch (type) {
      case 'common':
        return measurementType.COMMON;
      case 'metric':
        return metric;
      case 'imperial':
        return measurementType.IMPERIAL;
      default:
        return metric;
    }
  };

  const buildButtons = (type) => {
    const labels = getButtonLabels(type);
    return labels.map((label) => {
      return (
        <Button
          key={label}
          onClick={() => setWaterNumber(waterNumber + Number(label.value))}
        >
          {label.name}
        </Button>
      );
    });
  };

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
          {buildButtons(waterMeasurements)}
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
