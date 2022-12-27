import {Autocomplete, Box, Button, CircularProgress, Modal, Paper, TextField, Typography} from "@mui/material";
import {getAdminCourses, getTeacherCourses, getTeacherEmails, getUsers, saveCourse} from "./axiosRequests";
import React from "react";
import {useCookies} from "react-cookie";
import {CreateUser, nameRegex, roles, UserTable} from "./User";
import {useSnackbar} from "notistack";
import {requestResult} from "./main";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

export const CreateCourse = () => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [teacherEmail, setTeacherEmail] = React.useState<string>("");
    const [courseName, setCourseName] = React.useState<string>("");

    const [teachers, setTeachers] = React.useState<string[]>([]);
    React.useEffect(() => {
        getTeacherEmails(setTeachers, cookies["token"], requestResult(enqueueSnackbar))
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


const columns: GridColDef[] = [
    {field: 'TeacherName', headerName: 'Teacher Name', width: 130},
    {field: 'Name', headerName: 'Course Name', width: 300},
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

export const CourseTable = () => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [rows, setRows] = React.useState<[]>([]);

    React.useEffect(() => {
        getAdminCourses(setRows, cookies["token"], requestResult(enqueueSnackbar))
    }, []);

    return <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(e: { Name: string }) => e.Name}
    />
}

export const CoursePage = () => {
    const [open, setOpen] = React.useState(false);
    return <Box display="flex" flexDirection="column" height="85vh">
        <Box display="flex" justifyContent="flex-end" margin="5vw">
            <Button variant="contained" onClick={() => setOpen(true)}>New</Button>
        </Box>
        <CourseTable/>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CreateCourse/>
        </Modal>
    </Box>
}