import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token:null
}

export const authslice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        set_token:(state,action)=>{
            state.token=action.payload
        }
    }
})

export const {set_token}=authslice.actions;
export default authslice.reducer;