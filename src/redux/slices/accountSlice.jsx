import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
    name: 'accounts',
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
        setLoadingAccount: (state, action) => {
            state.loading = action.payload;
        },
        setErrorAccount: (state, action) => {
            state.error = action.payload;
        }
    }
});

export const { setAccountData, setLoadingAccount, setErrorAccount } = accountSlice.actions;
export default accountSlice.reducer;