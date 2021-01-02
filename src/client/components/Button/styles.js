import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled(motion.button)`
  color: #fff;
  font-size: 12px;
  outline: none;
  transition: 0.15s;
  cursor: pointer;
  box-shadow: 0 0 10px rgb(111, 111, 111, 0.3);
  border: none;
  ${(props) => (props.fluid ? 'width: 100%' : '')};
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
