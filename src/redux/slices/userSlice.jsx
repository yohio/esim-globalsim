import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        userId: null,
        first_name: '',
        last_name: '',
        nickname: '',
        name: '',
        description: '',
        roles: [],
        capabilities: {},
        extra_capabilities: {},
        meta: {}
    },
    reducers: {
        setUser: (state, action) => {
            return {
                ...state,
                ...action.payload
            };
        },
        clearUser: (state) => {
            return userSlice.initialState;
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;