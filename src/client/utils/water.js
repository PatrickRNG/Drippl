import { measurementNames } from 'client/utils/constants';

const convertMlToL = (mlValue) => mlValue / 1000;

const convertLToMl = (lValue) => lValue * 1000;

const convertMlToOz = (mlValue) => mlValue * 0.0338;

const convertOzToMl = (ozValue) => ozValue / 0.0338;

const convertToDecimal = (number) => Math.round(number * 100) / 100;

const formatNumber = (value) => Math.round(value * 100) / 100;

const getMeasurementInitial = (type) => {
  switch (type) {
    case measurementNames.METRIC:
      return 'ml';
    case measurementNames.IMPERIAL:
      return 'oz';
    case measurementNames.COMMON:
      return 'ml';
    default:
      return 'ml';
  }
};

const buildConvertedWaterLabel = (water, type) => {
  const metricLabel =
    water >= 1000
      ? `${formatNumber(convertMlToL(water))} L`
      : `${formatNumber(water)} ml`;
  switch (type) {
    case measurementNames.METRIC:
      return metricLabel;
    case measurementNames.IMPERIAL:
      return `${convertToDecimal(convertMlToOz(water))} oz`;
    default:
      return metricLabel;
  }
};

const waterToNumber = (value, type) => {
  const [waterNumber, waterMeasurement] = value.split(' ');

  switch (type) {
    case measurementNames.METRIC:
      if (waterMeasurement === 'L') return convertLToMl(Number(waterNumber));
      return Number(waterNumber);
    case measurementNames.IMPERIAL:
      return convertToDecimal(Number(waterNumber));
    default:
      return Number(waterNumber);
  }
};

export {
  convertMlToL,
  convertLToMl,
  convertMlToOz,
  convertOzToMl,
  waterToNumber,
  buildConvertedWaterLabel,
  getMeasurementInitial,
};
