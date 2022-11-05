import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDirectoryDocument } from "../firebase/firebase.utils";

const INITIAL_STATE = {
  directories: [],
  status: "idle",
  error: null,
};
export const fetchDirectory = createAsyncThunk('FetchDirectory', async () => {
  const Directory = await getDirectoryDocument()
  return Directory
  
})


const directorySlice = createSlice({
  name: "directory",
  initialState: INITIAL_STATE,
  reducers: {
    // setDirectoryItem: (state, action) => {
    //   return {
    //     ...state,
    //     directories: action.payload,
    //   };
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDirectory.pending, (state, action) => {
        // state.status = "loading";
        return{
          ...state,
          status: "loading"
        }
      })
      .addCase(fetchDirectory.fulfilled, (state, action) => {
        // state.status = "fulfilled";
        return {...state,
          status:'fulfilled',
        directories:action.payload}
      })
      .addCase(fetchDirectory.rejected, (state, action) => {
        return {
          ...state,
          status: 'failed',
          error:action.error.message
        }
      });
  },
});

export const {  setDirectoryItem } = directorySlice.actions;
export default directorySlice.reducer;
