import 'react-circular-progressbar/dist/styles.css';
import React from 'react';
import PropTypes from 'prop-types';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { buildWaterLabel } from 'utils/water';
import { Wrapper, GraphWrapper, Gradient, CircleChart } from './styles';

const electron = window.require('electron');

const Chart = ({ water, objective, setObjective }) => {
  const totalWater =
    water.length &&
    water.map(({ value }) => value).reduce((prev, curr) => prev + curr);

  const openConfig = () => {
    electron.ipcRenderer.send('notification-config', 'test hey');
  };

  return (
    <Wrapper>
      <div
        style={{
          width: '30px',
          height: '30px',
          background: '#ccc',
          padding: '10px',
          position: 'absolute',
          top: '0',
          zIndex: '1',
        }}
        onClick={openConfig}
        aria-hidden="true"
      />
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
            %<div className="totalWater">{buildWaterLabel(totalWater)}</div>
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

Chart.propTypes = {
  water: PropTypes.array.isRequired,
  objective: PropTypes.number.isRequired,
  setObjective: PropTypes.func.isRequired,
};

export default Chart;
