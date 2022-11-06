import { createSelector } from "@reduxjs/toolkit";

const selectCategoriesReducer = (state) => state.categoriesSaga;

//memoized the state if it
const selectCategoriesSaga = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
);
export const selectCategoriesMapSaga = createSelector(
  [selectCategoriesSaga],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

export const selectCategoriesLoadingSaga = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.status
);
