import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  padding: 15px 12px;
  margin: 0 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  min-height: 78px;
`;

export const WaterLabel = styled.div`
  padding: 15px;
  align-self; center;
	color: #717171;
`;

export const Date = styled.div`
  font-size: 12px;
  color: #aaa;
`;
