import React from 'react';
import styled from 'styled-components';
import { Wrapper, GraphWrapper, Gradient } from './styles';

const Chart = ({ water, buildWaterLabel }) => {
  const totalWater = water
    .map(({ value }) => value)
    .reduce((prev, curr) => prev + curr);

  return (
    <Wrapper>
      <Gradient />
      <GraphWrapper>
        <h2>{buildWaterLabel(totalWater)}</h2>
      </GraphWrapper>
    </Wrapper>
  );
};

export default Chart;
