import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
  user: {
    username: string,
    email: string,
    id: string
  };
  isAuthenticated: boolean
}


const initialState: InitialState = {
  user: {
    username: '',
    email: '',
    id: ''
  },
  isAuthenticated: false
}



const userSlice = createSlice({
  name: 'userState',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const user: InitialState['user'] = action.payload;
      state.user = user;
    },
    setIsAuthenticated: (state, action) => {
      const isAuthenticated: boolean = action.payload;
      state.isAuthenticated = isAuthenticated;
    }
  }
})

export const { setUser, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;