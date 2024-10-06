import {Device} from "./Device";

export interface BasketItemModel {
    id?: string;
    deviceId: string;
    basketId: string;
    device?: Device;
}
