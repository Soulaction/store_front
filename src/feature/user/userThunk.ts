import {createAsyncThunk} from "@reduxjs/toolkit";
import {User} from "../../pages/AdminUserPage/types/User";
import {getUser} from "../../http/user-http";

export const fetchUser = createAsyncThunk<User, void, {
    rejectValue: string;
}>('user/fetchUser',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await getUser();
            return data;
        } catch {
            return rejectWithValue('Пользователь не найден');
        }
    }
)
