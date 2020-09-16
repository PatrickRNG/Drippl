import styled from 'styled-components';

export const Flex = styled.div`
  display: flex;
  align-items: ${(props) => (props.alignItems ? props.alignItems : '')};
  justify-content: ${(props) => (props.justify ? props.justify : '')};
  margin: ${(props) => (props.margin ? props.margin : '')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  flex-direction: ${(props) => (props.direction ? props.direction : 'row')};
`;
