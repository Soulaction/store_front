import {Type} from "../model/Type";
import {makeAutoObservable} from "mobx";

export class TypeStore {
    types: Type[] = [];
    selectedType: Type;

    constructor() {
        makeAutoObservable(this)
    }

    setTypes(types) {
        this.types = types;
    }
}
