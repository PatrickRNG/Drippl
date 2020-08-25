import styled from 'styled-components';

export const Input = styled.input`
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  padding: 6px 10px;
  outline: none;
  width: 150px;
  max-width: 150px;
  max-height: 35px;
  font-size: 18px;
  color: #707070;
  text-align: ${({ align }) => align || 'center'};
  font-weight: bold;
  align-self: center;
`;
