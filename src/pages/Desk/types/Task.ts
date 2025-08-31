import {User} from "../../AdminUserPage/types/User";

export type Task = {
    id: string;
    name: string;
    description: string;
    deadline: string;
    done: boolean;
    idType: string;
    executor: Pick<User, 'id' | 'fio'>;
}