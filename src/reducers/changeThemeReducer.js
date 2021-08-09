/** @format */

import { types } from "../actions/action.changeTheme";

const initialState = {
  darkTheme: true,
};

const changeThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_THEME:
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    default:
      return state;
  }
};

export default changeThemeReducer;
