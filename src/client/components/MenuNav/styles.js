import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Nav = styled(motion.nav)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: 2;
  pointer-events: ${({ open }) => (!open ? 'none' : 'all')};
`;

export const MenuBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background: #fbfbfb;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 12px 0px;
`;

export const MenuButton = styled(motion.button)`
  position: absolute;
  left: 10px;
  top: 10px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  z-index: 3;
  pointer-events: auto;
`;

export const QuitButton = styled(motion.a)`
  position: absolute;
  right: 20px;
  top: 12px;
  font-size: 14px;
  color: #929292;
  cursor: pointer;
  z-index: 3;
  transition: 0.15s;

  &: hover {
    color: #5a5a5a;
  }
`;
