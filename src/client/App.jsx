import React from 'react';
import { Main, AlertTemplate } from 'client/components';
import { WaterProvider } from 'client/contexts/waterContext';
import { ConfigProvider } from 'client/contexts/configContext';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import { GlobalStyle } from './styles';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3500,
  offset: '30px',
  transition: transitions.FADE,
  type: 'success',
};

const App = () => (
  <ConfigProvider>
    <WaterProvider>
      <AlertProvider template={AlertTemplate} {...options}>
        <GlobalStyle />
        <Main />
      </AlertProvider>
    </WaterProvider>
  </ConfigProvider>
);

export default App;
