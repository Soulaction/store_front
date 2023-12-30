import { makeAutoObservable } from 'mobx'
import {User} from "../model/User";

export default class UserStore {
    user: User;
    isAuth: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    setIsAuth(isAuth) {
        this.isAuth = isAuth
    }

    setIsUser(user) {
        this.user = user
    }
}
