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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  margin: 20px auto 0 auto;
  background-color: #fff;
  height: 270px;
  width: 75%;
  border-radius: 25px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.059);

  & .objective {
    text-align: center;
    margin-top: 15px;
    span {
      color: #707070;
      font-size: 12px;
      margin-right: 8px;
    }

    input {
      outline: none;
      width: 50%;
      border: 1px solid #ececec;
      border-radius: 4px;
      padding: 6px;
      color: #707070;

      &::placeholder {
        color: #707070;
      }
    }
  }
`;

export const CircleChart = styled.div`
  position: relative;
  width: 65%;

  & .chartText {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 35px;
    color: #707070;
  }

  & .totalWater {
    font-size: 20px;
    text-align: center;
  }
`;

