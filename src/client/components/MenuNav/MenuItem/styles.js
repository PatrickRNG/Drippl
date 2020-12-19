import styled from 'styled-components';
import { motion } from 'framer-motion';

const BaseInputStyle = `
  margin-top: 8px;
  border: 1px solid #ccc;
  background-color: #fff;
  color: #707070;
  outline: none;
  padding: 6px;
  border-radius: 4px;
`;

export const Item = styled(motion.li)`
  color: #303030;
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const Select = styled.select`
  ${BaseInputStyle}
  cursor: pointer;
`;

export const Input = styled.input`
  ${BaseInputStyle}
`;
