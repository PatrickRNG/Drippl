import React, { useEffect } from 'react';
import { endOfDay, isAfter, subMinutes } from 'date-fns';
import { Water, Chart, MenuNav, Success } from 'client/components';
import { useWaterDispatch, useWaterState } from 'client/contexts/waterContext';
import { useConfigState } from 'client/contexts/configContext';
import { channels } from 'shared/constants';

const { ipcRenderer } = window.require('electron');

const Main = () => {
  const { options } = useConfigState();
  const { totalWater } = useWaterState();
  const hasCompleted = totalWater >= options.objective;
  const dispatch = useWaterDispatch();

  useEffect(() => {
    // Send app configs to electron
    ipcRenderer.send(channels.CONFIG, options);
  }, [options]);

  useEffect(() => {
    const today = new Date();
    const dayEnd = endOfDay(new Date());
    const minutesToEndDay = subMinutes(dayEnd, 10);
    const intervalId = setInterval(() => {
      // Reset all water state after the day is over
      if (isAfter(today, dayEnd)) {
        dispatch({
          type: 'reset',
        });
      }
      if (isAfter(today, minutesToEndDay)) {
        ipcRenderer.invoke(
          channels.NOTIFICATE,
          'The day is about to end, update your water consumption!'
        );
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const onQuit = () => {
    ipcRenderer.invoke(channels.QUIT);
  };

  return (
    <>
      <MenuNav handleQuit={onQuit} />
      <Chart />
      <Water />
      <Success hasCompleted={hasCompleted} />
    </>
  );
};

export default Main;
