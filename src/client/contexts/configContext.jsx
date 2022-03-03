/* eslint-disable react/prop-types */
import React, { useReducer, useContext, createContext } from 'react';
import { configs } from 'client/utils/config';

const ConfigStateContext = createContext();
const ConfigDispatchContext = createContext();

const configReducer = (state, action) => {
  switch (action.type) {
    case 'set': {
      const { option } = action.payload;

      return {
        options: {
          ...state.options,
          ...option,
        },
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const ConfigProvider = ({ children }) => {
  const allOptions = configs.reduce((acc, curr) => {
    const value = curr?.value[0]?.value ? curr.value[0].value : curr.value;
    acc[curr.name] = value;
    return acc;
  }, {});
  const [state, dispatch] = useReducer(configReducer, {
    options: allOptions,
  });

  return (
    <ConfigStateContext.Provider value={state}>
      <ConfigDispatchContext.Provider value={dispatch}>
        {children}
      </ConfigDispatchContext.Provider>
    </ConfigStateContext.Provider>
  );
};

const useConfigState = () => {
  const context = useContext(ConfigStateContext);
  if (context === undefined) {
    throw new Error('useConfigState must be used within a WaterProvider');
  }

  return context;
};

const useConfigDispatch = () => {
  const context = useContext(ConfigDispatchContext);
  if (context === undefined) {
    throw new Error('useConfigDispatch must be used within a CountProvider');
  }
  return context;
};

export { ConfigProvider, useConfigState, useConfigDispatch };
