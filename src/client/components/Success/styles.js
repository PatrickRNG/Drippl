import styled from 'styled-components';

export const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  backdrop-filter: blur(10px);
`;

export const SuccessWrapper = styled.div`
  width: 80%;
  height: 40%;
  background: rgba(255, 255, 255, 0.85);
  z-index: 5;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .text {
    width: 90%;
    text-align: center;
    color: #222;
    font-size: 1.15rem;
  }
`;

export const Close = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  font-size: 1.5rem;
  color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.1s;
  line-height: 0.5;

  &:hover {
    color: #666;
  }
`;