import { configTypes } from './constants';

export const configs = [
  {
    name: 'notificationFrequency',
    text: 'Notification Frequency',
    value: [
      { name: '1 hour', value: 60 },
      { name: '2 hours', value: 120 },
      { name: '30 min', value: 30 },
      { name: 'Disable notifications', value: true },
    ],
    type: configTypes.SELECT,
  },
  {
    name: 'waterMeasurements',
    text: 'Buttons water measurement',
    value: [
      { name: 'Metric', value: 'metric' },
      { name: 'Imperial', value: 'imperial' },
      { name: 'Common', value: 'common' },
    ],
    type: configTypes.SELECT,
  },
];
