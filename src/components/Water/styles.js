import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 0 20px;
`;

export const Title = styled.h2`
  font-size: 14px;
  margin-bottom: 15px;
  color: #707070;
`;

export const Button = styled.button`
  color: #fff;
  font-size: 12px;
  outline: none;
  transition: 0.15s;
  cursor: pointer;
  border: none;
  ${(props) =>
    props.secondary
      ? css`
          min-width: 150px;
          background-color: #70d3ff;
          border-radius: 15px;

          &: hover {
            background-color: #54caff;
          }
        `
      : css`
          background-color: #477bff;
          padding: 8px;
          min-width: 80px;
          border-radius: 20px;

          &: hover {
            background-color: #5f86e8;
          }
        `}
`;

export const Flex = styled.div`
  display: flex;
  align-items: ${(props) => (props.alignItems ? props.alignItems : '')};
  justify-content: ${(props) => (props.justify ? props.justify : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`;

export const Input = styled.input`
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 6px 10px;
  outline: none;
  width: 150px;
  max-width: 150px;
  font-size: 18px;
  color: #707070;
  text-align: center;
  font-weight: bold;
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

export const Card = styled.div`
  padding: 15px 12px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.102);
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const WaterCard = styled.div`
  padding: 15px;
  align-self; center;
	color: #717171;
`;

export const Date = styled.div`
  font-size: 12px;
  color: #c1c1c1;
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
    transition: color .2s;

    &:hover {
      color: #707070;
    }
  }
`;