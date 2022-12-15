import React from 'react'
import {
    Autocomplete, Button,
    CircularProgress,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField
} from "@mui/material";
import {getCourses, getExams, getStudentEmails, saveExam} from "./axiosRequests";
import {useCookies} from "react-cookie";

export type exam = {
    StudentName: string;
    CourseName: string ;
    Points :number;
}

export const GetStudentExams = () => {
    const [cookies] = useCookies();

    const [exams, setExams] = React.useState<exam[]>([]);

    React.useEffect(() => {
        getExams(setExams, cookies["token"])
    }, []);

    console.log(exams)

    return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
            <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Student&nbsp;Name</TableCell>
                <TableCell align="right">Course&nbsp;Name</TableCell>
                <TableCell align="right">Points</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {exams.length <1?
                <CircularProgress />:
                exams.map((exam,index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell align="right">{exam.StudentName}</TableCell>
                    <TableCell align="right">{exam.CourseName}</TableCell>
                    <TableCell align="right">{exam.Points}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
</TableContainer>;
}

//TODO: Add clear form after submit checkbox
export const CreateExams = () => {
    const [cookies] = useCookies();

    const [courseName, setCourseName] = React.useState<string>("");
    const [studentEmail, setStudentEmail] = React.useState<string>("");
    const [points, setPoints] = React.useState<number>(0);

    const [studentEmailsList, setStudentEmailsList] = React.useState<string[]>([]);
    const [courseList, setCourseList] = React.useState<string[]>([]);
    React.useEffect(() => {
        getStudentEmails(setStudentEmailsList, cookies.get("token"))
        getCourses(setCourseList, cookies.get("token"))
    }, []);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        saveExam(courseName, studentEmail, points, cookies.get("token"))
    }

    return (studentEmailsList.length <1 || courseList.length <1)?
        <CircularProgress />:
        <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" direction="column">
            <Grid item>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={studentEmailsList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} error={(studentEmail=="")} label="Student email" />}
                    inputValue={studentEmail}
                    onInputChange={(_, newInputValue) => setStudentEmail(newInputValue)}
                />
            </Grid>
            <Grid item>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={courseList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} error={(courseName=="")} label="Course" />}
                    inputValue={courseName}
                    onInputChange={(_, newInputValue) => setCourseName(newInputValue)}
                />
            </Grid>
            <Grid item>
                <TextField
                    error={(points > 100 || points < 0)}
                    id="points"
                    name="points"
                    label="Points"
                    type="number"
                    value={points}
                    onChange={ (e) => setPoints(parseInt(e.target.value))}
                />
            </Grid>
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </Grid>
    </form>;
}