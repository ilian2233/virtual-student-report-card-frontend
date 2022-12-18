import {Autocomplete, Button, CircularProgress, Paper, TextField, Typography} from "@mui/material";
import {getTeachers, saveCourse} from "./axiosRequests";
import React from "react";
import {useCookies} from "react-cookie";
import {nameRegex} from "./User";
import {useSnackbar} from "notistack";
import {requestResult} from "./main";

export const CreateCourse = () => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [teacherEmail, setTeacherEmail] = React.useState<string>("");
    const [courseName, setCourseName] = React.useState<string>("");

    const [teachers, setTeachers] = React.useState<string[]>([]);
    React.useEffect(() => {
        getTeachers(setTeachers, cookies["token"], requestResult(enqueueSnackbar))
    }, []);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        saveCourse(courseName, teacherEmail, cookies["token"], requestResult(enqueueSnackbar))
    }

    return teachers.length < 1 ?
        <CircularProgress/> :
        <Paper
            sx={{
                width: 'fit-content',
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
            <Typography component="h1"><b>Create new course:</b></Typography>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={teachers}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} error={(teacherEmail == "")} label="Teacher email"/>}
                inputValue={teacherEmail}
                onInputChange={(_, newInputValue) => setTeacherEmail(newInputValue)}
            />
            <TextField
                error={!nameRegex.test(courseName)}
                name="CourseName"
                type="courseName"
                placeholder="Math"
                label="CourseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
            />
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </Paper>
}