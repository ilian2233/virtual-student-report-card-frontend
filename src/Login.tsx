import React from "react";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {login} from "./axiosRequests";
import {useCookies} from "react-cookie";
import {emailRegex} from "./User";

export const passwordRegex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/

export const Login = () => {
    const [_, setCookie] = useCookies();

    const [password, setPassword] = React.useState<string>("test_pas_123");
    const [email, setEmail] = React.useState<string>("test@test.com");

    const handleSubmit = () => {
        login(email, password, setCookie)
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
        <div>
            <Typography component="h1">
                <b>Welcome!</b>
            </Typography>
            <Typography>Sign in to continue.</Typography>
        </div>
        <TextField
            error={!emailRegex.test(email)}
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            label="Email"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
        />
        <TextField
            error={!passwordRegex.test(password)}
            name="password"
            type="password"
            placeholder="password"
            label="Password"
            value={password}
            onChange={ (e) => setPassword(e.target.value)}
        />
        <Button sx={{ mt: 1 /* margin top */ }} onClick={handleSubmit}>Log in</Button>
    </Paper>
}