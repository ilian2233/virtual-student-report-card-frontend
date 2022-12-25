import {useCookies} from "react-cookie";
import React from "react";
import {getUsers, saveUser} from "./axiosRequests";
import {Box, Button, Modal, Paper, TextField, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {requestResult} from "./main";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

export type roles = "student" | "teacher" | "admin"
export const nameRegex = /^([a-zA-Z]\s?)*$/
export const emailRegex = /^(\S+@\S+\.\S+)?$/
export const phoneRegex = /^(\d{10})?$/

export const CreateUser = (props: { role: roles }) => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        saveUser(name, email, phone, cookies["token"], props.role, requestResult(enqueueSnackbar))
    }

    return <Paper
        sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & botom
            py: 3, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            borderRadius: 'sm',
            boxShadow: 'md',
        }}
        variant="outlined"
    >
        <Typography component="h1"><b>Create new {props.role}:</b></Typography>
        <TextField
            error={!nameRegex.test(name)}
            name="Name"
            type="name"
            placeholder="Ivan"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <TextField
            error={!emailRegex.test(email)}
            name="Email"
            type="email"
            placeholder="johndoe@email.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
            error={!phoneRegex.test(phone)}
            name="Phone"
            type="phone"
            placeholder="0881234567"
            label="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
        />
        <Button onClick={handleSubmit}>
            Submit
        </Button>
    </Paper>
}

const studentExclusiveColumns: GridColDef[] = [
    {field: 'FacultyNumber', headerName: 'Faculty Number', type: 'number', width: 130},
];

const columns: GridColDef[] = [
    {field: 'Name', headerName: 'Name', width: 130},
    {field: 'Email', headerName: 'Email', width: 130},
    {field: 'Phone', headerName: 'Phone', type: 'number', width: 130},
    {
        field: 'action',
        headerName: 'Archive',
        sortable: false,
        width: 130,
        renderCell: (params) => {
            const onClick = (e: { stopPropagation: () => void; }) => {
                e.stopPropagation(); // don't select this row after clicking
                return alert(JSON.stringify("thisRow", null, 4));
            };

            return <Button onClick={onClick}>Archive</Button>;
        },
    },
];

export const UserTable = (props: { role: roles }) => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [rows, setRows] = React.useState<[]>([]);

    React.useEffect(() => {
        getUsers(setRows, cookies["token"], props.role, requestResult(enqueueSnackbar))
    }, []);

    return <DataGrid
        rows={rows}
        columns={props.role !== "student" ? columns : [...studentExclusiveColumns, ...columns]}
        getRowId={(e: { Email: string }) => e.Email}
    />
}

export const UserPage = (props: { role: roles }) => {
    const [open, setOpen] = React.useState(false);
    return <Box display="flex" flexDirection="column" height="85vh">
        <Box display="flex" justifyContent="flex-end" margin="5vw">
            <Button variant="contained" onClick={() => setOpen(true)}>New</Button>
        </Box>
        <UserTable role={props.role}/>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CreateUser role={props.role}/>
        </Modal>
    </Box>
}
