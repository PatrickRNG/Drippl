import { measurementNames } from 'client/utils/constants';

const convertMlToL = (mlValue) => mlValue / 1000;

const convertLToMl = (lValue) => lValue * 1000;

const convertMlToOz = (mlValue) => mlValue * 0.0338;

const convertOzToMl = (ozValue) => ozValue / 0.0338;

const convertToDecimal = (number) => Math.round(number * 100) / 100;

const buildConvertedWaterLabel = (water, type) => {
  switch (type) {
    case measurementNames.METRIC:
      return water >= 1000 ? `${convertMlToL(water)} L` : `${water} ml`;
    case measurementNames.IMPERIAL:
      return `${convertToDecimal(convertMlToOz(water))} oz`;
    default:
      return water >= 1000 ? `${convertMlToL(water)} L` : `${water} ml`;
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
};
