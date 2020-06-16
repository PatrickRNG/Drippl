import React from 'react';
import { format } from 'date-fns';
import {
  WaterProvider,
  useWaterState,
  useWaterDispatch,
} from './contexts/waterContext';

const WaterDisplay = () => {
  const { water } = useWaterState();
  const dispatch = useWaterDispatch();

  console.log('wattttt', water);

  const totalWater = water
    .map(({ value }) => value)
    .reduce((prev, curr) => prev + curr);
  console.log('TOTAL > ', water);

  const convertMl = (mlValue) => mlValue / 1000;
  const waterText = (water) =>
    water >= 1000 ? `${convertMl(water)} L` : `${water} ml`;
  const addWater = (water) =>
    dispatch({
      type: 'add',
      payload: { water: Number(water) },
    });

  const buildButtons = (labels) =>
    labels.map((label) => {
      return (
        <button onClick={() => addWater(label)}>{waterText(label)}</button>
      );
    });

  // TODO - Better naming on water object
  return (
    <>
      <h1>Water consumption</h1>
      <div>{buildButtons([50, 200, 500, 1000])}</div>
      <h2>{waterText(totalWater)}</h2>
      <h3>History</h3>
      {water.map(({value, createdAt}) => (
        <>
          <div>water: {value}</div>
          <div>date: {format(createdAt, 'do MMM hh:mm a')}</div>
        </>
      ))}
    </>
  );
};

const App = () => {
  return (
    <WaterProvider>
      <WaterDisplay />
    </WaterProvider>
  );
};

export default App;
