import { createSlice } from "@reduxjs/toolkit";

export const favouriteSong = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    setFavouriteSong: (state, action) => [...state, action.payload],

    setRemoveFavouriteSong: (state, action) => state.filter((song) => song !== action.payload),
  },
});

export const { setFavouriteSong } = favouriteSong.actions;
export const { setRemoveFavouriteSong } = favouriteSong.actions;

export default favouriteSong.reducer;
