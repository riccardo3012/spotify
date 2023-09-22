import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "counter",
  initialState: {
    search: false,
    searchQuery: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const { setSearch, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
