import React from "react";

import { LOGIN, LOGOUT, SET_CATEGORIES, LOADING_CATEGORIES } from "./types";

const initialState = {
  authenticated: false,
  user: "",
  loading: false,
  categories: [],
};

const mainReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        authenticated: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: "",
        authenticated: false,
      };
    case SET_CATEGORIES:
      return {
        ...state,
        loading: false,
        categories: [...action.payload],
      };
    case LOADING_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export const MainContext = React.createContext(initialState);

export const MainContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(mainReducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatch }}>
      {children}
    </MainContext.Provider>
  );
};
