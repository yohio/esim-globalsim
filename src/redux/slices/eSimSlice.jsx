import { createSlice } from '@reduxjs/toolkit';

const eSimSlice = createSlice({
    name: 'eSim',
    initialState: {
        data: {
            nodes: []
        },
        loading: false,
        error: null
    },
    reducers: {
        setESimData: (state, action) => {
            state.data = action.payload;
        },
        clearESimData: (state) => {
            state.data = initialState;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setESimData, clearESimData, setLoading, setError } = eSimSlice.actions;
export default eSimSlice.reducer;