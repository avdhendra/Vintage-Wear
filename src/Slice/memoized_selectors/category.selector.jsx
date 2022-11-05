import { createSelector } from "@reduxjs/toolkit"

const selectCategoriesReducer = (state) => state.categories

//memoized the state if it  
 const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice)=>categoriesSlice.categories
)
export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);

export const selectCategoriesLoading = createSelector(
  [selectCategoriesReducer],
    (categoriesSlice)=>categoriesSlice.status
)