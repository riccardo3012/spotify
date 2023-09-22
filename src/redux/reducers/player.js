import { createSlice } from "@reduxjs/toolkit";

export const playerReducer = createSlice({
  name: "player",
  initialState: {
    currentSong: {},
  },
  reducers: {
    setPlay: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { setPlay } = playerReducer.actions;

export default playerReducer.reducer;
