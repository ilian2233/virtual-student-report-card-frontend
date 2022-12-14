import React from "react";
import axios from "axios";
import {exam} from "./Exams";

const baseURL = "http://localhost:8080";
const TOKEN_STUDENT="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiZXhwIjoxNjczNjM1MTczLCJyb2xlcyI6WyJTdHVkZW50Il19.yWekp2YbBhS6DhmX_zFnFD1Z6bgEkTIXugiitxTI7YA"
const TOKEN_TEACHER="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwiZXhwIjoxNjczNjM1MjIzLCJyb2xlcyI6WyJUZWFjaGVyIl19.NIm04srRBeS4uYVD5m87qgQQEXY2ifELJqoj6rPr3GM"

export const getExams = (setExams:  React.Dispatch<React.SetStateAction<exam[]>>) => {

    const config = {
        headers:{
            Authorization: TOKEN_STUDENT,
        }
    };

    axios.get(baseURL+"/student/exams",config)
        .then((response: { data: exam[] }) => {
        setExams(response.data);
    })
        .catch(error => {
        console.error(error);
    });
};

export const getStudentEmails = (setStudents:  React.Dispatch<React.SetStateAction<string[]>>) => {

    const config = {
        headers:{
            Authorization: TOKEN_TEACHER,
        }
    };

    axios.get(baseURL+"/teacher/students",config)
        .then((response: { data: string[] }) => {
            setStudents(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

export const getCourses = (setCourses:  React.Dispatch<React.SetStateAction<string[]>>) => {

    const config = {
        headers:{
            Authorization: TOKEN_TEACHER,
        }
    };

    axios.get(baseURL+"/teacher/courses",config)
        .then((response: { data: string[] }) => {
            setCourses(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

export const  saveExam = (examCourseName: string, examStudentEmail: string, examPoints: number) => {

    const config = {
        headers:{
            Authorization: TOKEN_TEACHER,
        }
    };

    axios.post(baseURL+"/teacher/exams", {CourseName: examCourseName, StudentEmail: examStudentEmail, Points: examPoints},config)
        .then((response: { data: string[] }) => {
            console.log("Success");
        })
        .catch(error => {
            console.error(error);
        });
}