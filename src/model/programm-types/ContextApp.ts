import UserStore from "../../store/UserStore";
import DeviceStore from "../../store/DeviceStore";
import BasketStore from "../../store/BasketStore";
import OrderStore from "../../store/OrderStore";
import {TypeStore} from "../../store/TypeStore";
import {BrandStore} from "../../store/BrandStore";
import UsersSystemStore from "../../store/UsersSystemStore";

export class ContextAppModel {
    userStore: UserStore = new UserStore();
    usersSystemStore: UsersSystemStore = new UsersSystemStore();
    deviceStore: DeviceStore = new DeviceStore();
    basketStore: BasketStore = new BasketStore();
    orderStore: OrderStore = new OrderStore();
    typesStore: TypeStore = new TypeStore();
    brandsStore: BrandStore = new BrandStore();

    static ContextAppModel(): ContextAppModel {
        return new ContextAppModel();
    }
}
