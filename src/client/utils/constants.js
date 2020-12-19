export const configTypes = {
  TEXT: 'text',
  SELECT: 'select',
  NUMBER: 'number',
};

export const measurementNames = {
  COMMON: 'commom',
  METRIC: 'metric',
  IMPERIAL: 'imperial',
};

export const measurementType = {
  COMMON: [
    { name: '1/2 cup', value: 120 },
    { name: '1 cup', value: 240 },
    { name: '1/2 liter', value: 500 },
    { name: '1 liter', value: 1000 },
  ],
  METRIC: [
    { name: '50 ml', value: 50 },
    { name: '200 ml', value: 200 },
    { name: '500 ml', value: 500 },
    { name: '1 L', value: 1000 },
  ],
  IMPERIAL: [
    { name: '4 oz', value: 118.3431952662722 },
    { name: '8 oz', value: 236.6863905325444 },
    { name: '16 oz', value: 473.3727810650888 },
    { name: '32 oz', value: 946.7455621301776 },
  ],
};
