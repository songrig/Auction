import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const initialState = {
    user: {
        email: "",
        name: "",
        surName: "",
        balanse: "",
        uid: "",
        referance: "",
        isAuth: "",
        userIMg:"",
        myBougthItems:""
    },
    liveDrow: "CardImg"
}


const reducer = {
    setUser: (state, action) => {
        // state.user.email = action.payload.email
        // state.user.name = action.payload.name
        // state.user.surName = action.payload.surName
        // state.user.balanse = action.payload.balanse
        // state.user.uid = action.payload.uid
        // state.user.referance = action.payload.referance
        // state.user.isAuth = action.payload.isAuth
        state.user = {
            ...state.user,
            ...action.payload
        }

    },
    setLiveDrow: (state, action) => {
        state.liveDrow = action.payload.liveDrow

    },
    setAuth:(state) => {
        state.user = initialState
    }

},

    counterSlice = createSlice({
        name: 'auction',
        initialState,
        reducers: reducer
    })

// Action creators are generated for each case reducer function
export const { setUser, setLiveDrow,setAuth } = counterSlice.actions

export default counterSlice.reducer