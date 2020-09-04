import React, { useState, useEffect } from 'react';
import { Water, Chart, MenuNav } from 'components';
import { useWaterState } from 'contexts/waterContext';
import { useConfigState } from 'contexts/configContext';

const electron = window.require('electron');

const Main = () => {
  const { water } = useWaterState();
  const [objective, setObjective] = useState(2000);
  const { options } = useConfigState();

  useEffect(() => {
    // Send app configs to electrons
    electron.ipcRenderer.send('config', options);
  }, [options]);

  return (
    <>
      <MenuNav />
      <Chart water={water} objective={objective} setObjective={setObjective} />
      <Water water={water} objective={objective} />
    </>
  );
};

export default Main;
