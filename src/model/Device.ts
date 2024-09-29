import {DeviceInfo} from "./DeviceInfo";

export interface Device {
    id: string,
    name: string,
    price: number,
    img: string[],
    brandId: string,
    typeId: string,
    total: number,
    info: DeviceInfo[]
}
