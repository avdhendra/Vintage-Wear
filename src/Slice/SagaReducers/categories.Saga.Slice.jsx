import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  categories: [],
  status: "idle",
  error: null,
};

const categorySagaSlice = createSlice({
  name: "category",
  initialState: INITIAL_STATE,
  reducers: {
    setCategoriesSuccess: (state, action) => {
      return {
        ...state,
        status: "fulfilled",
        categories: action.payload,
      };
    },
    setCategoriesStart: (state, action) => {
      return {
        ...state,
        status: "loading",
      };
    },
    setCategoriesError: (state, action) => {
      return {
        ...state,
        status: "error",
        error: action.payload,
      };
    },
  },
});

export const { setCategoriesSuccess,setCategoriesStart,setCategoriesError} = categorySagaSlice.actions;
export default categorySagaSlice.reducer;
