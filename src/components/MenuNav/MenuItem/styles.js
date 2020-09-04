import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Item = styled(motion.li)`
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export const Select = styled.select`
  margin-top: 8px;
  border: 1px solid #ccc;
  outline: none;
  background-color: #fff;
  padding: 4px 16px;
  cursor: pointer;
`;
