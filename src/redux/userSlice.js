import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id : "",
  username : "",
  token : "",
  onlineUser : [],
  socketConnection : null
}

export const userSlice = createSlice({
  username: 'user',
  initialState,
  reducers: {
    setUser : (state,action)=>{
        state._id = action.payload._id
        state.username = action.payload.name 
    },
    setToken : (state,action)=>{
        state.token = action.payload
    },
    logout : (state, action)=>{
        state._id = ""
        state.username = ""
        state.token = ""
        state.socketConnection = null
    },
    setOnlineUser : (state,action)=>{
      state.onlineUser = action.payload
    },
    setSocketConnection : (state,action)=>{
      state.socketConnection = action.payload
    }
  },
})

export const { setUser, setToken ,logout, setOnlineUser,setSocketConnection } = userSlice.actions

export default userSlice.reducer