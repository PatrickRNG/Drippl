import React, { useState } from 'react';
import {
  WaterProvider,
  useWaterState,
  useWaterDispatch,
} from './contexts/waterContext';

const WaterDisplay = () => {
  const [waterText, setWaterText] = useState(0);
  const { water } = useWaterState();
  const dispatch = useWaterDispatch();

  return (
    <>
      <h1>Water consumption</h1>
      <input
        type="number"
        value={waterText}
        onChange={(e) => setWaterText(e.target.value)}
      />
      <button onClick={() => dispatch({ type: 'add', payload: { water: Number(waterText) } })}>Add</button>
      <div>{water} ml</div>
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
