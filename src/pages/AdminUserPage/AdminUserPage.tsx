import React from 'react';
import {Column, Table} from "ui-kit-dynamics";

const columnUsersTable: Column[] = [
    {
        header: 'ФИО',
        field: 'fio',
    },
    {
        header: 'Телефон',
        field: 'telephone',
    },
    {
        header: 'E-mail',
        field: 'email',
    },
    {
        header: 'Роли',
        field: 'role',
    },
]


const AdminUserPage = () => {
    return (
        <div>
            <Table column={columnUsersTable} value={[]}></Table>
        </div>
    );
};

export default AdminUserPage;