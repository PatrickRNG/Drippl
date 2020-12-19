import React, { useEffect } from 'react';
import { Water, Chart, MenuNav } from 'client/components';
import { useConfigState } from 'client/contexts/configContext';
import { channels } from 'shared/constants';

const { ipcRenderer } = window.require('electron');

const Main = () => {
  const { options } = useConfigState();

  useEffect(() => {
    // Send app configs to electron
    ipcRenderer.send(channels.CONFIG, options);
  }, [options]);

  const onQuit = () => {
    ipcRenderer.send(channels.QUIT);
  };

  return (
    <>
      <MenuNav handleQuit={onQuit} />
      <Chart />
      <Water />
    </>
  );
};

export default Main;
