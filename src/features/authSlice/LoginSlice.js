import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../../api/authAPI";

const initialState = {
    accessToken: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: null,
}


export const loginUser = createAsyncThunk("auth/login",async(userData) => {
    try{
        const response = await userLogin(userData);
        if(response.status === 200){
            alert("Đăng nhập thành công!")
            localStorage.setItem("accessToken",response.data.accessToken)
            return response.data;
        }else{
            alert ("Đăng nhập thất bại!")
        }
    }catch (e) {
        return e;
    }
});

export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        clearState: (state,action) => {
            state.isError = action.payload;
            state.isLoading = action.payload;
            state.isSuccess = action.payload; 
        }
      },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) =>{
                state.isLoading = true;
                state.errorMessage = '';

                return state;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.accessToken=  action.payload.accessToken;

                return state;
            })
            .addCase(loginUser.rejected, (state, action)=> {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload.message;

                return state;
            })
    }
});

export const selectToken = (state) => state.login.accessToken;
export const selectIsLoading = (state) => state.login.isLoading;
export const selectIsError = (state) => state.login.isError;
export const selectErrorMessage = (state) => state.login.errorMessage;
export const selectIsSuccess = (state) => state.login.isSuccess;

export const {clearState} = LoginSlice.actions;

export default LoginSlice.reducer;  