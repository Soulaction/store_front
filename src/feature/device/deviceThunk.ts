import {createAsyncThunk} from "@reduxjs/toolkit";
import {errorHandler} from "../../utils/utils";
import {fetchDevices} from "../../http/device-http";
import {PaginationDevices} from "../../model/PaginationDevices";
import {RootState} from "../../store";

export const fetchDevicesData = createAsyncThunk<PaginationDevices, void,
    {
        state: RootState,
        rejectValue: string;
    }>(
    'device/fetchDevices',
    async (filterData, {getState, rejectWithValue}) => {
        try {
            const {data} = await fetchDevices(getState().device.filterData);
            return data;
        } catch (e) {
            const errorText = errorHandler(e);
            return rejectWithValue(errorText);
        }
    },
)
