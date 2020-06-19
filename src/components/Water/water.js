import React, { useState } from 'react';
import { format } from 'date-fns';
import { useWaterDispatch } from '../../contexts/waterContext';
import { Title, Button, Flex, Container, Input } from './styles';

const Water = ({ water, buildWaterLabel }) => {
  const dispatch = useWaterDispatch();
  const [waterNumber, setWaterNumber] = useState(0);

  const addWater = (water) =>
    dispatch({
      type: 'add',
      payload: { water: Number(water) },
    });

  const buildButtons = (labels) =>
    labels.map((label) => {
      return (
        <Button onClick={() => setWaterNumber(waterNumber + Number(label))}>
          {buildWaterLabel(label)}
        </Button>
      );
    });

  const handleAddWater = (water) => {
    if (water > 0) {
      addWater(water);
      setWaterNumber(0);
    }
  };

  return (
    <Container>
      <Title>Consumption</Title>
      <Flex justify="space-between" margin="0 0 15px 0">{buildButtons([50, 200, 500, 1000])}</Flex>
      <Flex justify="space-between">
        <Input value={buildWaterLabel(waterNumber)} />
        <Button secondary onClick={() => handleAddWater(waterNumber)}>Add</Button>
      </Flex>
      <h3>History</h3>
      {water.map(({ value, createdAt }) => (
        <>
          <div>water: {value}</div>
          <div>date: {format(createdAt, 'do MMM hh:mm a')}</div>
        </>
      ))}
    </Container>
  );
};

export default Water;
