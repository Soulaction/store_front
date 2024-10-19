import {DeviceInfo} from "./DeviceInfo";

export type Device = {
    id: string,
    name: string,
    price: number,
    img: string[],
    brandId: string,
    typeId: string,
    total: number,
    info: DeviceInfo[]
}
