import { combineReducers } from "redux";

const fetch = (state = [], action) => {
  switch (action.type) {
    case "FETCH_POST":
      return action.payload;
    default:
      return state;
  }
};

const fetchUsers = (state = [], action) => {
  switch (action.type) {
    case "FETCH_A_USER":
      return [...state, action.payload];
    default:
      return state;
  }
};

export default combineReducers({ fetch,fetchUsers });
