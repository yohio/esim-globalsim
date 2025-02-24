import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        data: {
            nodes: []
        },
        loading: false,
        error: null
    },
    reducers: {
        setAccountData: (state, action) => {
            state.data = action.payload;
        },
        clearAccountData: (state) => {
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

export const { setAccountData, clearAccountData, setLoading, setError } = accountSlice.actions;
export default accountSlice.reducer;