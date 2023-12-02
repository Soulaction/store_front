import { makeAutoObservable } from 'mobx'

export default class UserStore {
    constructor() {

        this._isAuth = false
        this._user = {}
        this._users = []
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setIsUser(user) {
        this._user = user
    }

    setIsUsers(users) {
        this._users = users
    }

    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }

}