import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../model/User";
import {fetchUser} from "./userThunk";

export type UserStore = {
    user: User | null,
    error: string,
    isLoading: boolean
}

const initialState: UserStore = {
    user: null,
    error: '',
    isLoading: false
}

const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {
            setUser: (state: UserStore, payload: PayloadAction<User>) => {
                state.user = payload.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(fetchUser.pending, (state: UserStore, action: PayloadAction) => {
                state.user = null;
                state.isLoading = true;
                state.error = '';
            });
            builder.addCase(fetchUser.fulfilled, (state: UserStore, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.isLoading = false;
                state.error = '';
            });
            builder.addCase(fetchUser.rejected, (state: UserStore, action: PayloadAction<string>) => {
                state.user = {
                    id: '3aa5f6f4-a86c-406a-bda2-77754fcc39cd',
                    fio: 'string',
                    telephone: 'string',
                    email: 'string',
                    role: 'USER'};
                state.isLoading = false;
                state.error = action.payload;
            });
        }
    }
)

export const userReducer = userSlice.reducer;
export const setUser = userSlice.actions.setUser;
