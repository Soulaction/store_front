import {observer} from "mobx-react-lite";
import * as React from "react";
import {FC, useContext, useState} from "react";
import {Box, Button, Checkbox, ListItemText, MenuItem, Modal, OutlinedInput, Select, TextField} from "@mui/material";
import {ContextApp} from "../../../index";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export interface CreateUserProps {
    typeModal: 'add' | 'edit',
    show: boolean,
    onHide: () => void
}

const CreateUserModal: FC<CreateUserProps> = ({typeModal, show, onHide}) => {

    const {usersSystemStore} = useContext(ContextApp);
    const [roles, setRoles] = useState<string[]>([])


    const addUser = () => {
        // createUser(email, password, types).then(data => onHide());
    }

    const changeUser = (key: string, data) => {
        usersSystemStore.selectedUser = {...usersSystemStore.selectedUser, [key]: data}
    }

    const displayHeader = (typeModal: string): string => {
        if (typeModal === 'add') {
            return 'Добавить пользователя'
        } else {
            return 'Редактировать пользователя'
        }
    }

    return (
        <Modal
            open={show}
            onClose={onHide}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <h1>{displayHeader(typeModal)}</h1>
                <form className="form" name="user-edit">
                    <TextField
                        label="ФИО"
                        variant="outlined"
                        fullWidth
                        name="fio"
                        value={usersSystemStore.selectedUser.fio}
                        onChange={(evt) => changeUser('fio', evt)}
                        required
                    />
                    <TextField
                        label="Телефон"
                        variant="outlined"
                        fullWidth
                        name="telephone"
                        value={usersSystemStore.selectedUser.telephone}
                        onChange={(evt) => changeUser('telephone', evt)}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        type="email"
                        value={usersSystemStore.selectedUser.email}
                        onChange={(evt) => changeUser('email', evt)}
                    />
                    <Select
                        labelId="multiple-checkbox-roles"
                        id="demo-multiple-checkbox"
                        multiple
                        value={usersSystemStore.selectedUser.roles}
                        onChange={(evt) => changeUser('roles', evt)}
                        input={<OutlinedInput label="Tag"/>}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                                <Checkbox checked={usersSystemStore.selectedUser.roles.indexOf(role) > -1}/>
                                <ListItemText primary={role}/>
                            </MenuItem>
                        ))}
                    </Select>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    )
}

export default observer(CreateUserModal);


