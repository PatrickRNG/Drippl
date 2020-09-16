import React, { useState, useEffect } from 'react';
import { Water, Chart, MenuNav } from 'client/components';
import { useWaterState } from 'client/contexts/waterContext';
import { useConfigState } from 'client/contexts/configContext';
import { channels } from 'shared/constants';

const { ipcRenderer } = window.require('electron');

const Main = () => {
  const { water } = useWaterState();
  const [objective, setObjective] = useState(2000);
  const { options } = useConfigState();

  useEffect(() => {
    // Send app configs to electrons
    ipcRenderer.send(channels.CONFIG, options);
  }, [options]);

  const onQuit = () => {
    ipcRenderer.send(channels.QUIT);
  };

  return (
    <>
      <MenuNav handleQuit={onQuit} />
      <Chart water={water} objective={objective} setObjective={setObjective} />
      <Water water={water} objective={objective} />
    </>
  );
};

export default Main;
