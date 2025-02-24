import { createSlice } from '@reduxjs/toolkit';

const activeMenuSlice = createSlice({
    name: 'activeMenu',
    initialState: { 
        activeItem: 'accounts' // Default active menu item
    },
    reducers: {
        setActiveMenuItem: (state, action) => {
            state.activeItem = action.payload;
        },
        clearActiveMenuItem: (state) => {
            state.activeItem = initialState;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setActiveMenuItem, clearActiveMenuItem, setLoading, setError } = activeMenuSlice.actions;
export default activeMenuSlice.reducer;