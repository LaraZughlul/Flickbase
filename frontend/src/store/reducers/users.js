import { createSlice } from '@reduxjs/toolkit';
import { registerUser, signInUser, isAuth, signOut, changeEmail, updateUserProfile } from '../actions/users';

let DEFAULT_USER_STATE = {
    loading: false,
    data: {
        _id: null,
        email: null,
        firstname: null,
        lastname: null,
        age: null,
        role: null,
        verified: null
    },
    auth: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: DEFAULT_USER_STATE,
    readucers: {
        setVerify: (state) => {
            state.data.verified = true;
        }
    },
    extraReducers: (builder) => {
        builder
            //Register
            .addCase(registerUser.pending, (state) => { state.loading = true })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.auth = action.payload.auth;
            })
            .addCase(registerUser.rejected, (state) => { state.loading = false })

            //Sign in
            .addCase(signInUser.pending, (state) => { state.loading = true })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.data;
                state.auth = action.payload.auth;
            })
            .addCase(signInUser.rejected, (state) => { state.loading = false })

            //isauth
            .addCase(isAuth.pending, (state) => { state.loading = true })
            .addCase(isAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload.data }
                state.auth = action.payload.auth;
            })
            .addCase(isAuth.rejected, (state) => { state.loading = false })

            //Change email
            .addCase(changeEmail.pending, (state) => { state.loading = true })
            .addCase(changeEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload }
            })
            .addCase(changeEmail.rejected, (state) => { state.loading = false })

            //Update user profile
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.data = { ...state.data, ...action.payload }
            })

            //Sign out
            .addCase(signOut.fulfilled, (state) => {
                state.data = DEFAULT_USER_STATE.data;
                state.auth = false;
            })
    }
});

export const { setVerify } = usersSlice.actions
export default usersSlice.reducer;