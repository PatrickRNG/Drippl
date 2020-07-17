import React, { useState } from 'react';
import { format } from 'date-fns';
import { useWaterDispatch } from '../../contexts/waterContext';
import { Edit, Trash } from '../../assets/icons';
import {
  Title,
  Button,
  Flex,
  Container,
  Input,
  Card,
  WaterCard,
  CardWrapper,
  Date,
  WaterNumber,
} from './styles';

const Water = ({ water, buildWaterLabel }) => {
  const dispatch = useWaterDispatch();
  const [waterNumber, setWaterNumber] = useState(0);

  const addWater = (water) =>
    dispatch({
      type: 'add',
      payload: { water: Number(water) },
    });

  const removeWater = (index) =>
    dispatch({
      type: 'remove',
      payload: { index },
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
      <Flex justify="space-between" margin="0 0 15px 0">
        {buildButtons([50, 200, 500, 1000])}
      </Flex>
      <Flex justify="space-between">
        <WaterNumber>
          <Input readOnly value={buildWaterLabel(waterNumber)} />
          <span onClick={() => setWaterNumber(0)}>&times;</span>
        </WaterNumber>
        <Button secondary onClick={() => handleAddWater(waterNumber, 'ml')}>
          Add
        </Button>
      </Flex>
      <CardWrapper>
        {water.map(({ value, createdAt }, index) => (
          <Card>
            <WaterCard>{buildWaterLabel(value)}</WaterCard>
            <Flex direction="column" justify="space-between">
              <Flex justify="flex-end">
                <span className="icon edit">
                  <Edit />
                </span>
                <span
                  className="icon delete"
                  onClick={() => removeWater(index)}
                >
                  <Trash />
                </span>
              </Flex>
              <Date>
                {format(createdAt, 'dd/MM')} {format(createdAt, 'hh:mm')}
              </Date>
            </Flex>
          </Card>
        ))}
      </CardWrapper>
    </Container>
  );
};

export default Water;
