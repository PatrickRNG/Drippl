import { configTypes } from './constants';

export const configs = [
  {
    name: 'objective',
    text: 'Water objective',
    value: 2000,
    type: configTypes.NUMBER,
  },
  {
    name: 'waterMeasurements',
    text: 'Water measurement system',
    value: [
      { name: 'Metric', value: 'metric' },
      { name: 'Imperial', value: 'imperial' },
      { name: 'Common', value: 'common' },
    ],
    type: configTypes.SELECT,
  },
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
];
