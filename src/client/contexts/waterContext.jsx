/* eslint-disable react/prop-types */
import React, { useReducer, useContext, createContext } from 'react';
import { v4 as uuid } from 'uuid';

const WaterStateContext = createContext();
const WaterDispatchContext = createContext();

const waterReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const { water } = action.payload;
      const waterArray = [
        { id: uuid(), value: water, createdAt: new Date() },
        ...state.water,
      ];

      return {
        water: waterArray,
        totalWater: waterArray.reduce((acc, curr) => acc + curr.value, 0),
      };
    }
    case 'remove': {
      const { index } = action.payload;
      const updatedWaterArray = [...state.water];
      updatedWaterArray.splice(index, 1);

      return {
        water: updatedWaterArray,
        totalWater: updatedWaterArray.reduce(
          (acc, curr) => acc + curr.value,
          0
        ),
      };
    }
    case 'edit': {
      const { water, index } = action.payload;
      const updatedWaterArray = [...state.water];
      updatedWaterArray[index].value = water;

      return {
        water: updatedWaterArray,
        totalWater: updatedWaterArray.reduce(
          (acc, curr) => acc + curr.value,
          0
        ),
      };
    }
    case 'reset': {
      return {
        water: [],
        totalWater: 0,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const WaterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(waterReducer, {
    water: [],
    totalWater: 0,
  });

  return (
    <WaterStateContext.Provider value={state}>
      <WaterDispatchContext.Provider value={dispatch}>
        {children}
      </WaterDispatchContext.Provider>
    </WaterStateContext.Provider>
  );
};

const useWaterState = () => {
  const context = useContext(WaterStateContext);
  if (context === undefined) {
    throw new Error('useWaterState must be used within a WaterProvider');
  }

  return context;
};

const useWaterDispatch = () => {
  const context = useContext(WaterDispatchContext);
  if (context === undefined) {
    throw new Error('useWaterDispatch must be used within a CountProvider');
  }
  return context;
};

export { WaterProvider, useWaterState, useWaterDispatch };
