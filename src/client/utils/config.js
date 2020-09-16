import { configTypes } from './constants';

export const configs = [
  {
    name: 'notificationFrequency',
    text: 'Notification Frequency',
    value: [
      { name: 'Disable notifications', value: true },
      { name: '30 min', value: 30 },
      { name: '1 hour', value: 60 },
      { name: '2 hours', value: 120 },
    ],
    type: configTypes.SELECT,
  },
  {
    name: 'waterMeasurements',
    text: 'Water measurement',
    value: [
      { name: 'Metric', value: 'metric' },
      { name: 'Imperial', value: 'imperial' },
      { name: 'Common', value: 'common' },
    ],
    type: configTypes.SELECT,
  },
];
