import {Device} from "./Device";

export type BasketItemModel = {
    id?: string,
    userId: string,
    deviceId: string
} & Omit<Device , 'id'>;
