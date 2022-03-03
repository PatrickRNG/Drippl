import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWaterDispatch, useWaterState } from 'client/contexts/waterContext';
import { useConfigState } from 'client/contexts/configContext';
import { WaterCard, Button } from 'client/components';
import { Flex, Input } from 'client/common/Elements';
import { buildConvertedWaterLabel } from 'client/utils/water';
import { measurementType } from 'client/utils/constants';
import { Title, Wrapper, CardWrapper, WaterNumber } from './styles';

const Water = () => {
  const { water } = useWaterState();
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
    switch (type) {
      case 'common':
        return measurementType.COMMON;
      case 'metric':
        return measurementType.METRIC;
      case 'imperial':
        return measurementType.IMPERIAL;
      default:
        return measurementType.METRIC;
    }
  };

  const buildButtons = (type) => {
    const labels = getButtonLabels(type);
    return labels.map((label) => (
      <Button
        key={label.value}
        onClick={() => setWaterNumber(waterNumber + Number(label.value))}
      >
        {label.name}
      </Button>
    ));
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
            <Input
              readOnly
              value={buildConvertedWaterLabel(waterNumber, waterMeasurements)}
            />
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
              value={buildConvertedWaterLabel(value, waterMeasurements)}
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

export default Water;
