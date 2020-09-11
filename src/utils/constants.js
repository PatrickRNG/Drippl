export const configTypes = {
  TEXT: 'text',
  SELECT: 'select',
};

export const measurementType = {
  COMMON: [
    { name: '1/2 cup', value: 120 },
    { name: '1 cup', value: 240 },
    { name: '1/2 liter', value: 500 },
    { name: '1 liter', value: 1000 },
  ],
  METRIC: [
    { name: '50', value: 50 },
    { name: '200', value: 200 },
    { name: '500', value: 500 },
    { name: '1000', value: 1000 },
  ],
  IMPERIAL: [
    { name: '4 oz', value: 120 },
    { name: '8 oz', value: 240 },
    { name: '16 oz', value: 500 },
    { name: '32 oz', value: 1000 },
  ],
};
