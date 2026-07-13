import React from "react";
import { createContext, useContext, useReducer } from "react";

const initialState = {
  learnerName: "",
};
// ------------
function appReducer(state, action) {
  switch (action.type) {
    case "SET_LEARNER_NAME":
      return {
        ...state,
        learnerName: action.payload,
      };

    default:
      return state;
  }
}

// --------
const AppContext = createContext();

// ---------

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// -----------

export function useApp() {
  return useContext(AppContext);
}
