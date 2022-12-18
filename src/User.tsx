import {useCookies} from "react-cookie";
import React from "react";
import {saveUser} from "./axiosRequests";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {requestResult} from "./main";

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