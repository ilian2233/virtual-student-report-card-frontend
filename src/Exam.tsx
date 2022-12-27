import React from 'react'
import {
    Autocomplete, Box,
    Button,
    CircularProgress, Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {
    getTeacherCourses,
    getTeacherExams,
    getStudentFacultyNumbers,
    saveExam,
    getAdminCourses,
    getStudentExams
} from "./axiosRequests";
import {useCookies} from "react-cookie";
import {requestResult} from "./main";
import {useSnackbar} from "notistack";
import {DataGrid, GridColDef} from "@mui/x-data-grid";

export type exam = {
    StudentName: string;
    CourseName: string;
    Points: number;
}

export const GetStudentExams = () => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [exams, setExams] = React.useState<exam[]>([]);

    React.useEffect(() => {
        getStudentExams(setExams, cookies["token"], requestResult(enqueueSnackbar))
    }, []);

    //TODO: Fix display when drawer is open
    return <TableContainer sx={{display: "flex", justifyContent: "center"}} component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Student&nbsp;Name</TableCell>
                    <TableCell>Course&nbsp;Name</TableCell>
                    <TableCell>Points</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {exams.length < 1 ?
                    <CircularProgress/> :
                    exams.map((exam, index) => (
                        <TableRow
                            key={index}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell>{exam.StudentName}</TableCell>
                            <TableCell>{exam.CourseName}</TableCell>
                            <TableCell>{exam.Points}</TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    </TableContainer>;
}

//TODO: Add clear form after submit checkbox
export const CreateExams = () => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [courseName, setCourseName] = React.useState<string>("");
    const [studentFacultyNumber, setStudentFacultyNumber] = React.useState<string>("");
    const [points, setPoints] = React.useState<number>(0);

    const [studentFacultyNumbers, setStudentFacultyNumbers] = React.useState<string[]>([]);
    const [courseList, setCourseList] = React.useState<string[]>([]);
    React.useEffect(() => {
        getStudentFacultyNumbers(setStudentFacultyNumbers, cookies["token"], requestResult(enqueueSnackbar))
        getTeacherCourses(setCourseList, cookies["token"], requestResult(enqueueSnackbar))
    }, []);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        saveExam(courseName, studentFacultyNumber, points, cookies["token"], requestResult(enqueueSnackbar))
    }

    return (studentFacultyNumbers.length < 1 || courseList.length < 1) ?
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
            <Typography component="h1"><b>Create new exam:</b></Typography>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={studentFacultyNumbers}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} error={(studentFacultyNumber == "")} label="Student faculty number"/>}
                inputValue={studentFacultyNumber}
                onInputChange={(_, newInputValue) => setStudentFacultyNumber(newInputValue)}
            />
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={courseList}
                sx={{width: 300}}
                renderInput={(params) => <TextField {...params} error={(courseName == "")} label="Course"/>}
                inputValue={courseName}
                onInputChange={(_, newInputValue) => setCourseName(newInputValue)}
            />
            <TextField
                error={(points > 100 || points < 0)}
                id="points"
                name="points"
                label="Points"
                type="number"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value))}
            />
            <Button onClick={handleSubmit}>
                Submit
            </Button>
        </Paper>;
}


const columns: GridColDef[] = [
    {field: 'StudentFacultyNumber', headerName: 'Student Faculty Number', width: 300},
    {field: 'CourseName', headerName: 'Course Name', width: 300},
    {field: 'Points', headerName: 'Points', width: 130},
];

export const ExamsTable = () => {
    const [cookies] = useCookies();
    const {enqueueSnackbar} = useSnackbar();

    const [rows, setRows] = React.useState<[]>([]);

    React.useEffect(() => {
        getTeacherExams(setRows, cookies["token"], requestResult(enqueueSnackbar))
    }, []);

    return <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(e: { StudentFacultyNumber: string,CourseName: string,Points: string, }) => e.StudentFacultyNumber+e.CourseName+e.Points}
    />
}

export const ExamsPage = () => {
    const [open, setOpen] = React.useState(false);
    return <Box display="flex" flexDirection="column" height="85vh">
        <Box display="flex" justifyContent="flex-end" margin="5vw">
            <Button variant="contained" onClick={() => setOpen(true)}>New</Button>
        </Box>
        <ExamsTable/>
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <CreateExams/>
        </Modal>
    </Box>
}