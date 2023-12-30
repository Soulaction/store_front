import {Brand} from "../model/Brand";
import {makeAutoObservable} from "mobx";

export class BrandStore {
    brands: Brand[] = [];
    selectedBrand: Brand;

    constructor() {
        makeAutoObservable(this);
    }

    setBrands(brands){
        this.brands = brands;
    }

    setSelectedBrand(brand){
        this.selectedBrand = brand;
    }
}
