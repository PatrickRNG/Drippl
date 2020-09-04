import styled from 'styled-components';

export const Container = styled.div`
  padding: 0 20px;
`;

export const Title = styled.h2`
  font-size: 14px;
  margin-bottom: 15px;
  color: #707070;
`;

export const CardWrapper = styled.div`
  height: 100%;
  margin-top: 15px;

  & .icon {
    cursor: pointer;
    transition: 2s;

    &.edit {
      transition: 2s;
      fill: #c1c1c1;
      margin-right: 10px;
      &:hover path {
        fill: #717171;
      }
    }

    &.delete {
      &:hover path {
        fill: #ef4d4d;
      }
    }
  }
`;

export const WaterNumber = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  & span {
    position: absolute;
    right: 0;
    cursor: pointer;
    font-size: 20px;
    color: #c1c1c1;
    margin-right: 10px;
    transition: color 0.2s;

    &:hover {
      color: #707070;
    }
  }
`;
