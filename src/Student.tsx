import {useCookies} from "react-cookie";
import React from "react";
import {saveStudent} from "./axiosRequests";
import {Button, Grid, TextField} from "@mui/material";

export const CreateStudent = () => {
    const [cookies] = useCookies();

    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const [phone, setPhone] = React.useState<string>("");

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        saveStudent(name, email, phone, cookies["token"])
    }

    return <Grid container alignItems="center" direction="column">
                <Grid item>
                    <TextField
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