import {Type} from "../model/Type";
import {makeAutoObservable} from "mobx";

export class TypeStore {
    types: Type[] = [];
    selectedType: Type;

    constructor() {
        makeAutoObservable(this)
    }

    setType(type: Type) {
        this.selectedType = type;
    }
    setTypes(types: Type[]) {
        this.types = types;
    }
}
