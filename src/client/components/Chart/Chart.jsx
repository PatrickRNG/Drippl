import 'react-circular-progressbar/dist/styles.css';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { buildConvertedWaterLabel, convertOzToMl } from 'client/utils/water';
import { measurementNames } from 'client/utils/constants';
import { useWaterState } from 'client/contexts/waterContext';
import { useConfigState } from 'client/contexts/configContext';
import { Wrapper, GraphWrapper, Gradient, CircleChart } from './styles';

const Chart = () => {
  const { water } = useWaterState();
  const {
    options: { waterMeasurements, objective },
  } = useConfigState();

  const totalWater =
    water.length &&
    water.map(({ value }) => value).reduce((prev, curr) => prev + curr);

  const buildConvertedObjective = (value) => {
    switch (waterMeasurements) {
      case measurementNames.METRIC:
        return +value;
      case measurementNames.IMPERIAL:
        return convertOzToMl(+value);
      default:
        return +value;
    }
  };

  const convertedObjective = buildConvertedObjective(objective);

  const buildObjectivePercentage = () =>
    convertedObjective !== 0 && totalWater <= convertedObjective
      ? Math.round((totalWater / convertedObjective) * 100)
      : 100;

  const percentageGraphLine =
    convertedObjective !== 0 ? (totalWater / convertedObjective) * 100 : 100;

  return (
    <Wrapper>
      <Gradient />
      <GraphWrapper>
        <CircleChart>
          <CircularProgressbar
            strokeWidth={4}
            value={totalWater}
            maxValue={convertedObjective}
            styles={buildStyles({
              strokeLinecap: 'butt',
              pathColor: `rgba(112, 211, 255, ${percentageGraphLine})`,
              textColor: '#707070',
              trailColor: '#F8F8F8',
            })}
          />
          <div className="chartText">
            {buildObjectivePercentage()}%
            <div className="totalWater">
              {buildConvertedWaterLabel(totalWater, waterMeasurements)}
            </div>
          </div>
        </CircleChart>
      </GraphWrapper>
    </Wrapper>
  );
};

export default Chart;
