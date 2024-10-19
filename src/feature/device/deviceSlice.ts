import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Device} from "../../model/Device";
import {FilterData} from "../../model/programm-types/FilterData";
import {fetchDevicesData} from "./deviceThunk";
import {PaginationDevices} from "../../model/PaginationDevices";

export type DeviceStore = {
    filterData: FilterData,
    devices: Device[],
    count: number,
    error: string,
    isLoading: boolean
}

const initialState: DeviceStore = {
    filterData: {
        page: 1,
        limit: 10
    },
    devices: [],
    count: 0,
    error: '',
    isLoading: false

}

const deviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setFilterData: (state: DeviceStore, action: PayloadAction<FilterData>) => {
            state.filterData = action.payload;
        },
        setPage: (state: DeviceStore, action: PayloadAction<number>) => {
            state.filterData.page = action.payload;
        },
        setIdType: (state: DeviceStore, action: PayloadAction<string>) => {
            state.filterData.typeId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDevicesData.fulfilled, (state: DeviceStore , action: PayloadAction<PaginationDevices>) => {
            state.devices = action.payload.rows;
            state.count = action.payload.count;
            state.isLoading = false;
            state.error = '';
        })
        builder.addCase(fetchDevicesData.pending, (state: DeviceStore , action: PayloadAction) => {
            state.devices = [];
            state.isLoading = true;
            state.error = '';
        })
        builder.addCase(fetchDevicesData.rejected, (state: DeviceStore , action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        })
    }
})

export const deviceReducer = deviceSlice.reducer;
export const setFilterData = deviceSlice.actions.setFilterData;
export const setPage = deviceSlice.actions.setPage;
export const setIdType = deviceSlice.actions.setIdType;
