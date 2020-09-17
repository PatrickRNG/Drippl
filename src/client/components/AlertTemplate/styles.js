import styled from 'styled-components';

export const Alert = styled.div`
  position: relative;
  width: 85vw;
  padding: 16px;
  text-align: center;
  background-color: #f9f9f9;
  box-shadow: 0px 0px 10px 0 rgba(0, 0, 0, 0.15);
  color: #666;

  & .close {
    position: absolute;
    right: 16px;
    border: none;
    margin: 0;
    top: 13px;
    padding: 0;
    font-size: 20px;
    cursor: pointer;
    color: #999;
    background: none;
    outline: none;
  }
`;
