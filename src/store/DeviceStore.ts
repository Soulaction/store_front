import { makeAutoObservable } from 'mobx'
import {Device} from "../model/Device";

export default class DeviceStore {
    devices: Device[] = [];
    page: number = 1;
    totalCount: number = 0;
    limit: number = 5;

    constructor() {
        makeAutoObservable(this);
    }

    setDevices(devices) {
        this.devices = devices;
    }

    setPage(page) {
        this.page = page;
    }

    setTotalCount(count) {
        this.totalCount = count;
    }

    setLimit(limit) {
        this.limit = limit;
    }
}
