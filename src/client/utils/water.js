const convertMl = (mlValue) => mlValue / 1000;
const convertL = (lValue) => lValue * 1000;
const buildWaterLabel = (water) =>
  water >= 1000 ? `${convertMl(water)} L` : `${water} ml`;
const waterToNumber = (value) => {
  const [numberStr, metric] = value.split(' ');
  if (metric === 'L') {
    return convertL(Number(numberStr));
  }
  return Number(numberStr);
};

export { convertMl, convertL, waterToNumber, buildWaterLabel };
