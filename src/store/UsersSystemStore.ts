import {User} from "../model/User";
import {makeAutoObservable} from "mobx";

export default class UsersSystemStore {
    users: User[];
    selectedUser: User;

    constructor() {
        makeAutoObservable(this)
    }

    setUsers(users) {
        this.users = users
    }

    setSelectedUser(user) {
        this.selectedUser = user
    }
}
