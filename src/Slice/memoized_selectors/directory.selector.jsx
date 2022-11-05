import { createSelector } from "@reduxjs/toolkit";

const selectDirectoryReducer = (state) => state.directories
const selectDirectories = createSelector(
    [selectDirectoryReducer],
    (directoriesSlice)=>directoriesSlice.directories

)
export const directoriesSlice = createSelector(
  [selectDirectories],
  (directories) =>
    directories.reduce((acc, directory) => {
      const { name, items } = directory;
      acc[name.toLowerCase()] = items;
      return acc;
    }, {})
); export const selectDirectoriesLoading = createSelector(
  [selectDirectoryReducer],
  (directories) => directories.status
);