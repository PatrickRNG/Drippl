import React, { useReducer, useContext } from 'react';

const WaterStateContext = React.createContext();
const WaterDispatchContext = React.createContext();

function waterReducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { water } = action.payload;
      return {water: [...state.water, { value: water, createdAt: new Date() }]};
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function WaterProvider({ children }) {
  const [state, dispatch] = useReducer(waterReducer, {
    water: [
      {
        value: 0,
        createdAt: new Date(),
      },
    ],
  });

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
  const context = useContext(WaterDispatchContext);
  if (context === undefined) {
    throw new Error('useWaterDispatch must be used within a CountProvider');
  }
  return context;
}

export { WaterProvider, useWaterState, useWaterDispatch };
