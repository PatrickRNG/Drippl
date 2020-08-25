import React, { useState } from 'react';
import { Water, Chart } from 'components';
import { WaterProvider, useWaterState } from './contexts/waterContext';
import { GlobalStyle } from './styles';

const WaterDisplay = () => {
  const { water } = useWaterState();
  const [objective, setObjective] = useState(2000);

  return (
    <>
      <Chart water={water} objective={objective} setObjective={setObjective} />
      <Water water={water} objective={objective} />
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
