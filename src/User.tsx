import {useCookies} from "react-cookie";
import React from "react";
import {saveUser} from "./axiosRequests";
import {Button, Grid, TextField} from "@mui/material";

export type roles = "student"|"teacher"|"admin"
export const nameRegex = /^([a-zA-Z]\s?)*$/
export const emailRegex = /^(\S+@\S+\.\S+)?$/
export const phoneRegex = /^(\d{10})?$/

export const CreateUser = (props:{ role: roles}) => {
    const [cookies] = useCookies();

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        saveUser(name, email, phone, cookies["token"], props.role)
    }

    return <Grid container alignItems="center" direction="column">
                <Grid item>
                    <TextField
                        error={!nameRegex.test(name)}
                        name="Name"
                        type="name"
                        placeholder="Ivan"
                        label="Name"
                        value={name}
                        onChange={ (e) => setName(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        error={!emailRegex.test(email)}
                        name="Email"
                        type="email"
                        placeholder="johndoe@email.com"
                        label="Email"
                        value={email}
                        onChange={ (e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        error={!phoneRegex.test(phone)}
                        name="Phone"
                        type="phone"
                        placeholder="0881234567"
                        label="Phone"
                        value={phone}
                        onChange={ (e) => setPhone(e.target.value)}
                    />
                </Grid>
                <Button onClick={handleSubmit}>
                    Submit
                </Button>
            </Grid>
}