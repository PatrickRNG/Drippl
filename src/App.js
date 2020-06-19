import React from 'react';
import { WaterProvider, useWaterState } from './contexts/waterContext';
import Chart from './components/Chart/chart';
import Water from './components/Water/water';
import { GlobalStyle } from './styles';

const WaterDisplay = () => {
  const { water } = useWaterState();

  const convertMl = (mlValue) => mlValue / 1000;
  const buildWaterLabel = (water) =>
    water >= 1000 ? `${convertMl(water)} L` : `${water} ml`;

  return (
    <>
      <Chart water={water} buildWaterLabel={buildWaterLabel} />
      <Water water={water} buildWaterLabel={buildWaterLabel} />
    </>
  );
};

const App = () => {
  return (
    <WaterProvider>
      <GlobalStyle />
      <WaterDisplay />
    </WaterProvider>
  );
};

export default App;
