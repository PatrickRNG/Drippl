import React, { useReducer, useContext } from 'react';

const WaterStateContext = React.createContext();
const WaterDispatchContext = React.createContext();

function waterReducer(state, action) {
  switch (action.type) {
    case 'add': {
      return { water: state.water + action.payload.water };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function WaterProvider({ children }) {
  const [state, dispatch] = useReducer(waterReducer, { water: 0 });

  return (
    <WaterStateContext.Provider value={state}>
      <WaterDispatchContext.Provider value={dispatch}>
        {children}
      </WaterDispatchContext.Provider>
    </WaterStateContext.Provider>
  );
}

function useWaterState() {
  const context = useContext(WaterStateContext);
  if (context === undefined) {
    throw new Error('useWaterState must be used within a WaterProvider');
  }

  return context;
}

function useWaterDispatch() {
  const context = useContext(WaterDispatchContext)
  if (context === undefined) {
    throw new Error('useWaterDispatch must be used within a CountProvider')
  }
  return context
}

export { WaterProvider, useWaterState, useWaterDispatch };
