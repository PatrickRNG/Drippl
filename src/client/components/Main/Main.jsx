import React, { useEffect, useMemo } from 'react';
import { endOfDay, isAfter, subMinutes } from 'date-fns';
import { Water, Chart, MenuNav, Success } from 'client/components';
import { useWaterDispatch, useWaterState } from 'client/contexts/waterContext';
import { useConfigState } from 'client/contexts/configContext';
import { measurementNames } from 'client/utils/constants';
import { channels } from 'shared/constants';
import { convertMlToOz } from 'client/utils/water';

const Main = () => {
  const { options } = useConfigState();
  const { totalWater } = useWaterState();
  const hasCompleted = useMemo(() => {
    const isImperial = options.waterMeasurements === measurementNames.IMPERIAL;
    const convertedTotalWater = isImperial
      ? convertMlToOz(totalWater)
      : totalWater;

    return convertedTotalWater >= options.objective;
  }, [totalWater, options.objective]);

  const dispatch = useWaterDispatch();

  useEffect(() => {
    // Send app configs to electron
    window.electron.message.send(channels.CONFIG, options);
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
        window.electron.message.invoke(
          channels.NOTIFICATE,
          'The day is about to end, update your water consumption!'
        );
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const onQuit = () => {
    window.electron.message.invoke(channels.QUIT);
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
