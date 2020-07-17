import 'react-circular-progressbar/dist/styles.css';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Wrapper, GraphWrapper, Gradient, CircleChart } from './styles';

const Chart = ({ water, objective, setObjective, buildWaterLabel }) => {
  const totalWater =
    water.length &&
    water.map(({ value }) => value).reduce((prev, curr) => prev + curr);
  
  console.log({totalWater, objective});

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
              pathColor: `rgba(112, 211, 255, ${totalWater/objective * 100})`,
              textColor: '#707070',
              trailColor: '#F8F8F8',
            })}
          />
          <div className="chartText">
            {totalWater <= objective ? Math.round(totalWater/objective * 100) : 100}%
            <div className="totalWater">{buildWaterLabel(totalWater)}</div>
          </div>
        </CircleChart>
        <div className="objective">
          <span>Objective</span>
          <input
            type="number"
            onChange={(e) => setObjective(e.target.value || 2000)}
            placeholder="Water in ml"
          />
        </div>
      </GraphWrapper>
    </Wrapper>
  );
};

export default Chart;
