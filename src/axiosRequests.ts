import React from "react";
import axios from "axios";
import {exam} from "./Exams";
import {useCookies} from "react-cookie";
import {CookieSetOptions} from "universal-cookie";
import moment from "moment";
import {roles} from "./User";
import {teacher} from "./Course";

const baseURL = "http://localhost:8080";


export const login = (email: string, password: string, setCookie: (name: string, value: any, options?: (CookieSetOptions)) => void) => {
    axios.post(baseURL+"/login", {Email: email, Password: password},)
        .then((r) => setCookie("token", r.data.Token, {expires: moment(new Date()).add(30, 'm').toDate()}))
        .catch(error => {
            console.error(error);
        });
}

export const getExams = (setExams:  React.Dispatch<React.SetStateAction<exam[]>>, token: string) => {

    const config = {
        headers:{
            Authorization: token,
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

export const getStudentEmails = (setStudents:  React.Dispatch<React.SetStateAction<string[]>>, token: string) => {

    const config = {
        headers:{
            Authorization: token,
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

export const getCourses = (setCourses:  React.Dispatch<React.SetStateAction<string[]>>, token: string) => {

    const config = {
        headers:{
            Authorization: token,
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

export const saveExam = (courseName: string, studentEmail: string, points: number, token: string) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    axios.post(baseURL+"/teacher/exams", {CourseName: courseName, StudentEmail: studentEmail, Points: points}, config)
        .then((response: { data: string[] }) => {
            console.log("Success");
        })
        .catch(error => {
            console.error(error);
        });
}

export const saveUser = (name: string, email: string, phone: string, token: string, role: roles) => {

    let slug = ""
    switch (role){
        case "student":
            slug = "/admin/students"
            break
        case "teacher":
            slug = "/admin/teachers"
            break
        case "admin":
            slug = "/admin/admins"
            break
    }

    const config = {
        headers:{
            Authorization: token,
        }
    };

    axios.post(baseURL+slug, {Name: name, Email: email, Phone: phone}, config)
        .then(() => {
            console.log("Success");
        })
        .catch(error => {
            console.error(error);
        });
}

export const getTeachers = (setTeachers:  React.Dispatch<React.SetStateAction<string[]>>, token: string) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    axios.get(baseURL+"/admin/teachers",config)
        .then((response: { data: string[] }) => {
            setTeachers(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

export const saveCourse = (courseName: string, teacherEmail: string, token: string) => {

    const config = {
        headers:{
            Authorization: token,
        }
    };

    axios.post(baseURL+"/admin/courses", {CourseName: courseName, TeacherEmail: teacherEmail}, config)
        .then((response: { data: string[] }) => {
            console.log("Success");
        })
        .catch(error => {
            console.error(error);
        });
}