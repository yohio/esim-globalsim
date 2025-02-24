import { createSlice } from "@reduxjs/toolkit";
const initialState = {};
  
  const sourceSlice = createSlice({
    name: "sources",
    initialState,
    reducers: {
      addSource: (state, action) => {
        const newSource = {
          id: state.sources[state.sources.length - 1] + 1,
          name: action.payload,
        };
        state.sources.push(newSource);
      },
      removeSource: (state, action) => {
        state.sources = state.sources.filter(
          (source) => source.id !== action.payload
        );
      },
    },
  });
  
  export const { addSource, removeSource } = sourceSlice.actions;
  export default sourceSlice.reducer;