import 'react-circular-progressbar/dist/styles.css';
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { buildConvertedWaterLabel } from 'client/utils/water';
import { useWaterState } from 'client/contexts/waterContext';
import { useConfigState } from 'client/contexts/configContext';
import { Wrapper, GraphWrapper, Gradient, CircleChart } from './styles';

const Chart = ({ objective, setObjective }) => {
  const { water } = useWaterState();
  const {
    options: { waterMeasurements },
  } = useConfigState();

  const totalWater =
    water.length &&
    water.map(({ value }) => value).reduce((prev, curr) => prev + curr);

  return (
    <Wrapper>
      <Gradient />
      <GraphWrapper>
        <CircleChart>
          <CircularProgressbar
            strokeWidth={4}
            value={totalWater}
            maxValue={objective}
            styles={buildStyles({
              strokeLinecap: 'butt',
              pathColor: `rgba(112, 211, 255, ${
                (totalWater / objective) * 100
              })`,
              textColor: '#707070',
              trailColor: '#F8F8F8',
            })}
          />
          <div className="chartText">
            {totalWater <= objective
              ? Math.round((totalWater / objective) * 100)
              : 100}
            %
            <div className="totalWater">
              {buildConvertedWaterLabel(totalWater, waterMeasurements)}
            </div>
          </div>
        </CircleChart>
        <div className="objective">
          <span>Objective</span>
          <input
            type="number"
            min={1}
            onChange={(e) => setObjective(e.target.value || 2000)}
            placeholder="Water in ml"
          />
        </div>
      </GraphWrapper>
    </Wrapper>
  );
};

Chart.propTypes = {
  objective: PropTypes.number.isRequired,
  setObjective: PropTypes.func.isRequired,
};

export default Chart;
