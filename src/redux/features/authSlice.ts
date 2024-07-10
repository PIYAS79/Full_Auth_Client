import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type initialState_Type = {
    user: null|object,
    token:null|string,
}

const initialState:initialState_Type = {
    user : null,
    token:null
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        Login_User:(state,action:PayloadAction<initialState_Type>)=>{
            const {user,token} = action.payload;
            state.user = user
            state.token = token
        },
        Logout_User:(state)=>{
            state.token=null;
            state.user=null;
        }
    }
})

export const {Login_User,Logout_User} = authSlice.actions;  
export default authSlice.reducer;