import styled, { css } from 'styled-components';

export const Container = styled.div`
  padding: 0 20px;
`;

export const Title = styled.h2`
  font-size: 14px;
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
          background-color: #70D3FF;
          border-radius: 15px;

          &: hover {
            background-color: #54CAFF;
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
`;

export const Input = styled.input`
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 8px;
  outline: none;
  width: 115px;
  max-width: 115px;
  font-size: 18px;
  color: #707070;
  text-align: center;
  font-weight: bold;
`;
