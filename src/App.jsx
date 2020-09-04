import React from 'react';
import { Main } from 'components';
import { WaterProvider } from 'contexts/waterContext';
import { ConfigProvider } from 'contexts/configContext';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-oldschool-dark';
import { GlobalStyle } from './styles';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3500,
  offset: '30px',
  transition: transitions.FADE,
  type: 'success',
};

const App = () => {
  return (
    <ConfigProvider>
      <WaterProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <GlobalStyle />
          <Main />
        </AlertProvider>
      </WaterProvider>
    </ConfigProvider>
  );
};

export default App;
