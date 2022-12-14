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

export type exam = {
    StudentName: string;
    CourseName: string ;
    Points :number;
}

export const StudentExams = () => {

    const [exams, setExams] = React.useState<exam[]>([]);

    React.useEffect(() => {
        getExams(setExams)
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
export const TeacherExams = () => {
    const [examCourseName, setExamCourseName] = React.useState<string>("");
    const [examStudentEmail, setExamStudentEmail] = React.useState<string>("");
    const [examPoints, setExamPoints] = React.useState<number>(0);

    const [studentEmailsList, setStudentEmailsList] = React.useState<string[]>([]);
    const [courseList, setCourseList] = React.useState<string[]>([]);
    React.useEffect(() => {
        getStudentEmails(setStudentEmailsList)
        getCourses(setCourseList)
    }, []);

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        saveExam(examCourseName, examStudentEmail, examPoints)
    }

    return (studentEmailsList.length <1 || courseList.length <1)?
        <CircularProgress />:
        <form onSubmit={handleSubmit}>
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={studentEmailsList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} error={(examStudentEmail=="")} label="Student email" />}
                    inputValue={examStudentEmail}
                    onInputChange={(_, newInputValue) => setExamStudentEmail(newInputValue)}
                />
            </Grid>
            <Grid item>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={courseList}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} error={(examCourseName=="")} label="Course" />}
                    inputValue={examCourseName}
                    onInputChange={(_, newInputValue) => setExamCourseName(newInputValue)}
                />
            </Grid>
            <Grid item>
                <TextField
                    error={(examPoints > 100 || examPoints < 0)}
                    id="points"
                    name="points"
                    label="Points"
                    type="number"
                    value={examPoints}
                    onChange={ (e) => setExamPoints(parseInt(e.target.value))}
                />
            </Grid>
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </Grid>
    </form>;
}