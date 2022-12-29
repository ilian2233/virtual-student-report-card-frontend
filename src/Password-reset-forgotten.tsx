import {Button, Paper, TextField, Typography} from "@mui/material";
import {emailRegex} from "./User";
import React from "react";
import {passwordRegex} from "./Login";
import {useCookies} from "react-cookie";
import {useSnackbar} from "notistack";
import {requestResult} from "./main";
import {changePassword, forgottenPassword} from "./axiosRequests";

export const ChangePassword = () => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [password, setPassword] = React.useState<string>("test_pas_123");
    const [newPassword, setNewPassword] = React.useState<string>("");
    const [newPasswordConfirm, setNewPasswordConfirm] = React.useState<string>("");

    const handleSubmit = () => {
        changePassword(password, newPassword, cookies["token"], requestResult(enqueueSnackbar))
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
                <b>Fill the fields below:</b>
            </Typography>
        </div>
        <TextField
            error={!passwordRegex.test(password)}
            name="password"
            type="password"
            placeholder="password"
            label="Current password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
            error={!passwordRegex.test(password) && newPassword===password}
            name="password"
            type="password"
            placeholder="password"
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
        />
        <TextField
            error={!(newPassword===newPasswordConfirm)}
            name="password"
            type="password"
            placeholder="password"
            label="Confirm new password"
            value={newPasswordConfirm}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
        />
        <Button sx={{mt: 1}} onClick={handleSubmit}>Update password</Button>
    </Paper>
}

export const ForgottenPassword = () => {
    const {enqueueSnackbar} = useSnackbar();

    const [email, setEmail] = React.useState<string>("test@test.com");

    const handleSubmit = () => {
        forgottenPassword(email, requestResult(enqueueSnackbar))
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
                <b>Enter the email you have created your account with:</b>
            </Typography>
        </div>
        <TextField
            error={!emailRegex.test(email)}
            name="email"
            type="email"
            placeholder="johndoe@email.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <Button sx={{mt: 1}} onClick={handleSubmit}>Send new password</Button>
    </Paper>
}