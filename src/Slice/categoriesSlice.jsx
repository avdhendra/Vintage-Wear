import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCategoriesAndDocuments } from "../firebase/firebase.utils";

export const fetchCategories = createAsyncThunk("fetchCategories", async () => {
  const Categories = await getCategoriesAndDocuments();
  return Categories;
});

const INITIAL_STATE = {
  categories: [],
  status: "idle",
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState: INITIAL_STATE,
  reducers: {
    // setCategories: (state, action) => {
    //     return {
    //         ...state,
    //         categories: action.payload
    //     }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        //state.status='loading'
        return {
          ...state,
          status: "loading",
        };
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        //     state.status = 'fulfilled'
        //    state.categories= state.categories.concat(action.payload)
        return {
          ...state,
          status: "fulfilled",
          categories: action.payload,
        };
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        //     state.status = 'failed'
        //     state.error=action.error.message
        return {
          ...state,
          status: "failed",
          error: action.error.message,
        };
      });
  },
});

export const { setCategories, setDirectoryItem } = categorySlice.actions;
export default categorySlice.reducer;

// export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
//   categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {})
// );
// export const categories = (state) => {
//    return state.categories.categories.reduce((acc, category) => {
//         const { title, items } = category
//         acc[title.toLowerCase()] = items;
//         return acc;
//   },{}  )
// }
// export const directoriesSlice = createSelector([selectDirectories],(directories)=>
//     directories.reduce((acc, directory) => {
//           const {name,items} = directory
//           acc[name.toLowerCase()] = items
//           return acc
//     },{})
// )
// export const directoriesSlice = (state) => {
//    return state.categories.directories.reduce((acc, directory) => {

//     const {name,items} = directory

//     acc[name.toLowerCase()] = items
//     return acc

//     },{})
// }
