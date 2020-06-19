import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 300px;
  position: relative;
  overflow: auto;
`;

export const Gradient = styled.div`
  position: absolute;
  top: 0;
  height: 250px;
  width: 100%;
  background: linear-gradient(210.98deg, #70d3ff 0.65%, #477bff 95.25%);
  border-bottom-left-radius: 35px;
  border-bottom-right-radius: 35px;
`;

export const GraphWrapper = styled.div`
  position: relative;
  margin: 20px auto 0 auto;
  background-color: #fff;
  height: 270px;
  width: 75%;
  border-radius: 25px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.059);
`;
