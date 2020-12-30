import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  padding: 15px 12px;
  margin: 0 20px;
  border-radius: 4px;
  box-shadow: 0px 6px 20px rgba(111, 111, 111, 0.15);
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
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
